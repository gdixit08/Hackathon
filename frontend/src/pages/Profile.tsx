import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Key, User, CreditCard, FileText, LogOut } from "lucide-react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corporation",
    role: "Finance Manager",
    plan: "Professional",
    joined: "May 2023"
  });

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="John Doe" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-xl">{userInfo.name}</h2>
                <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                <Badge className="mt-2">{userInfo.plan}</Badge>
              </div>
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Key className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  API Access
                </Button>
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-red-500" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={userInfo.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Job Title</Label>
                      <Input 
                        id="role" 
                        value={userInfo.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="mr-2">Change</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Details about your account and subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Plan</p>
                      <p className="font-medium">{userInfo.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">{userInfo.joined}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reconciliations This Month</p>
                      <p className="font-medium">14 / 20</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Storage</p>
                      <p className="font-medium">265 MB / 2 GB</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Upgrade Plan</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2"></div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Use an authenticator app to generate one-time codes</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Recovery</p>
                        <p className="text-sm text-muted-foreground">Use SMS as a backup recovery method</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">New York, United States · Chrome on Windows</p>
                      <div className="text-xs text-muted-foreground mt-1">Started April 18, 2025 at 10:23 AM</div>
                    </div>
                    <Button variant="outline" size="sm">Sign Out All Other Devices</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reconciliation Complete</p>
                          <p className="text-sm text-muted-foreground">Get notified when a reconciliation process completes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Unmatched Transactions</p>
                          <p className="text-sm text-muted-foreground">Receive alerts about unmatched transactions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Account Updates</p>
                          <p className="text-sm text-muted-foreground">Receive updates about your account</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Communications</p>
                          <p className="text-sm text-muted-foreground">Stay updated with new features and promotions</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">System Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Browser Notifications</p>
                          <p className="text-sm text-muted-foreground">Allow browser notifications for important alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge>Professional</Badge>
                          <span className="text-sm text-muted-foreground">$29.99/month</span>
                        </div>
                        <p className="text-sm mt-1">Next billing date: May 21, 2025</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Change Plan</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Payment Methods</h3>
                      <Button variant="outline" size="sm">Add Method</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/26</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      <Button variant="outline" size="sm">Download All</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Professional Plan - April 2025</p>
                          <p className="text-sm text-muted-foreground">Apr 21, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Professional Plan - March 2025</p>
                          <p className="text-sm text-muted-foreground">Mar 21, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Professional Plan - February 2025</p>
                          <p className="text-sm text-muted-foreground">Feb 21, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                        </div>
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
};

export default Profile;