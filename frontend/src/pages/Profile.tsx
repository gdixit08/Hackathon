import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { 
  User,  
  Shield, 
  Activity, 
  KeyRound, 
  Link as LinkIcon,
  Mail, 
  Phone,
  Building,
  Pencil
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  avatarUrl: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    company: "Reconciliation Inc.",
    avatarUrl: "/api/placeholder/150/150"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState<UserProfile>(profile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value
    });
  };
  
  const saveProfile = () => {
    setProfile(editableProfile);
    setIsEditing(false);
  };
  
  const cancelEdit = () => {
    setEditableProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
              <CardDescription>Account Administrator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building size={18} className="text-gray-500" />
                <span>{profile.company}</span>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEditableProfile(profile);
                    setIsEditing(true);
                  }}
                >
                  <Pencil size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right content area - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
              <TabsTrigger value="personal">
                <User size={16} className="mr-2 hidden md:inline" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="roles">
                <Shield size={16} className="mr-2 hidden md:inline" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="security">
                <KeyRound size={16} className="mr-2 hidden md:inline" />
                Security
              </TabsTrigger>
              <TabsTrigger value="connected">
                <LinkIcon size={16} className="mr-2 hidden md:inline" />
                Connected
              </TabsTrigger>
              <TabsTrigger value="activity">
                <LinkIcon size={16} className="mr-2 hidden md:inline" />
                Activity
              </TabsTrigger>

            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            value={editableProfile.firstName} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            value={editableProfile.lastName} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={editableProfile.email} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={editableProfile.phone} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          name="company"
                          value={editableProfile.company} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={saveProfile}>Save Changes</Button>
                        <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">First Name</div>
                          <div>{profile.firstName}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Last Name</div>
                          <div>{profile.lastName}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div>{profile.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Phone Number</div>
                        <div>{profile.phone}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Company</div>
                        <div>{profile.company}</div>
                      </div>
                      <div className="pt-4">
                        <Button 
                          onClick={() => {
                            setEditableProfile(profile);
                            setIsEditing(true);
                          }}
                        >
                          Edit Information
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roles & Permissions Tab */}
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage your account access and capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Administrator</div>
                        <div className="text-sm text-gray-500">Full system access including user management</div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Reconciliation Manager</div>
                        <div className="text-sm text-gray-500">Create and manage all reconciliation tasks</div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Report Access</div>
                        <div className="text-sm text-gray-500">Generate and export financial reports</div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">User Manager</div>
                        <div className="text-sm text-gray-500">Add and manage system users</div>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Password</h3>
                      <p className="text-sm text-gray-500 mb-4">Last changed 3 months ago</p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                      <div className="flex items-center justify-between">
                        <div>Enable 2FA</div>
                        <Switch checked={false} />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium">Session Management</h3>
                      <p className="text-sm text-gray-500 mb-4">Manage your active sessions</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium">Current Session</div>
                            <div className="text-sm text-gray-500">Chrome on Windows • IP: 192.168.1.1</div>
                          </div>
                          <div className="text-green-500 text-sm font-medium">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Connected Accounts Tab */}
            <TabsContent value="connected">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage your external account connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">QuickBooks Online</div>
                          <div className="text-sm text-gray-500">Connected on Apr 15, 2025</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Bank Connection</div>
                          <div className="text-sm text-gray-500">Connected on Apr 10, 2025</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md border-dashed">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Connect New Service</div>
                          <div className="text-sm text-gray-500">Add accounting or banking service</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>Review your recent account activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Login from new device</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                        <p className="text-sm text-gray-500">Chrome on Windows • IP: 192.168.1.1</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Activity size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Bank connection updated</p>
                          <p className="text-sm text-gray-500">Yesterday</p>
                        </div>
                        <p className="text-sm text-gray-500">Synchronized 25 new transactions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <Activity size={16} className="text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Password changed</p>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                        <p className="text-sm text-gray-500">Through account settings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Activity size={16} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Reconciliation completed</p>
                          <p className="text-sm text-gray-500">4 days ago</p>
                        </div>
                        <p className="text-sm text-gray-500">April 2025 statements • 98% match rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}