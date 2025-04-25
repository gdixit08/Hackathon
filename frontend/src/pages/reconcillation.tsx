import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Check, X, AlertCircle, FileDown, 
  Link, LinkIcon, Search, ArrowLeftRight, 
  Eye, Plus, Filter, SlidersHorizontal, PieChart
} from "lucide-react";

// Types
type TransactionStatus = 'matched' | 'unmatched' | 'review';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  source: 'bank' | 'ledger';
  matchId?: string;
  confidence?: number;
  status: TransactionStatus;
  category?: string;
}

function Reconciliation() {
  // State for transactions and UI
  const [transactions, setTransactions] = useState<Transaction[]>(generateMockTransactions());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => {
    if (!searchQuery) return true;
    return transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           transaction.amount.toString().includes(searchQuery) ||
           transaction.date.includes(searchQuery);
  });

  // Group transactions by status for statistics
  const matchedTransactions = transactions.filter(t => t.status === 'matched');
  const unmatchedTransactions = transactions.filter(t => t.status === 'unmatched');
  const reviewTransactions = transactions.filter(t => t.status === 'review');
  
  // Calculate unique transaction counts (paired matches count as 1)
  const matchedCount = matchedTransactions.length / 2;
  const unmatchedCount = unmatchedTransactions.length;
  const reviewCount = reviewTransactions.length / 2;
  
  // Calculate total transaction amount by status
  const matchedAmount = matchedTransactions.reduce((sum, t) => 
    t.source === 'bank' ? sum + t.amount : sum, 0);
  const unmatchedAmount = unmatchedTransactions.reduce((sum, t) => 
    t.source === 'bank' ? sum + t.amount : sum, 0);
  const reviewAmount = reviewTransactions.reduce((sum, t) => 
    t.source === 'bank' ? sum + t.amount : sum, 0);
  
  // Calculate completion percentage
  const totalTransactions = matchedCount + unmatchedCount + reviewCount;
  const completionPercentage = totalTransactions > 0 ? 
    Math.round((matchedCount / totalTransactions) * 100) : 0;

  // Handle match confirmation and rejection
  const confirmMatch = (id: string) => {
    setTransactions(transactions.map(t => {
      if (t.id === id || t.matchId === id) {
        return {...t, status: 'matched', confidence: 100};
      }
      return t;
    }));
  };

  const rejectMatch = (id: string) => {
    setTransactions(transactions.map(t => {
      if (t.id === id || t.matchId === id) {
        return {...t, status: 'unmatched', matchId: undefined, confidence: undefined};
      }
      return t;
    }));
  };

  // Update confidence threshold
  const handleThresholdChange = (value: number[]) => {
    setConfidenceThreshold(value[0]);
    
    // Auto-update transaction statuses based on new threshold
    setTransactions(transactions.map(t => {
      if (t.confidence && t.confidence < value[0] && t.status === 'matched') {
        return {...t, status: 'review'};
      } else if (t.confidence && t.confidence >= value[0] && t.status === 'review') {
        return {...t, status: 'matched'};
      }
      return t;
    }));
  };

  // Render confidence indicator with appropriate color
  const renderConfidenceIndicator = (confidence?: number) => {
    if (!confidence) return null;
    
    let color = 'bg-red-500';
    if (confidence >= 90) color = 'bg-green-500';
    else if (confidence >= 70) color = 'bg-yellow-500';
    else if (confidence >= 50) color = 'bg-orange-500';
    
    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${color}`}></div>
        <span>{confidence}%</span>
      </div>
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Mock data generation
  function generateMockTransactions(): Transaction[] {
    return [
      {
        id: '1',
        date: '2025-04-23',
        description: 'Amazon Web Services',
        amount: 129.99,
        source: 'bank',
        matchId: '101',
        confidence: 95,
        status: 'matched',
        category: 'Software'
      },
      {
        id: '101',
        date: '2025-04-23',
        description: 'AWS Monthly Subscription',
        amount: 129.99,
        source: 'ledger',
        matchId: '1',
        confidence: 95,
        status: 'matched',
        category: 'Software'
      },
      {
        id: '2',
        date: '2025-04-22',
        description: 'UBER TRIP 5648',
        amount: 24.50,
        source: 'bank',
        matchId: '102',
        confidence: 85,
        status: 'matched',
        category: 'Travel'
      },
      {
        id: '102',
        date: '2025-04-22',
        description: 'Uber - Airport Trip',
        amount: 24.50,
        source: 'ledger',
        matchId: '2',
        confidence: 85,
        status: 'matched',
        category: 'Travel'
      },
      {
        id: '3',
        date: '2025-04-20',
        description: 'MICROSOFT 365',
        amount: 9.99,
        source: 'bank',
        status: 'unmatched',
        category: 'Software'
      },
      {
        id: '103',
        date: '2025-04-19',
        description: 'Office Supplies',
        amount: 45.75,
        source: 'ledger',
        status: 'unmatched',
        category: 'Office'
      },
      {
        id: '4',
        date: '2025-04-18',
        description: 'PAYPAL *DESIGNTOOLS',
        amount: 19.99,
        source: 'bank',
        matchId: '104',
        confidence: 62,
        status: 'review',
        category: 'Software'
      },
      {
        id: '104',
        date: '2025-04-17',
        description: 'Design Software - Monthly',
        amount: 19.99,
        source: 'ledger',
        matchId: '4',
        confidence: 62,
        status: 'review',
        category: 'Software'
      },
      {
        id: '5',
        date: '2025-04-15',
        description: 'AMZN MKT 56734',
        amount: 35.67,
        source: 'bank',
        matchId: '105',
        confidence: 78,
        status: 'matched',
        category: 'Office'
      },
      {
        id: '105',
        date: '2025-04-15',
        description: 'Amazon - Office Supplies',
        amount: 35.67,
        source: 'ledger',
        matchId: '5',
        confidence: 78,
        status: 'matched',
        category: 'Office'
      }
    ];
  }

  // Find matching transaction
  const findMatchingTransaction = (transaction: Transaction) => {
    if (!transaction.matchId) return null;
    return transactions.find(t => t.id === transaction.matchId);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Navigation Tabs */}
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="text-sm">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="review" className="text-sm">
              Review
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Main Stats Card */}
              <Card className="col-span-1 md:col-span-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
                <CardHeader>
                  <CardTitle>Reconciliation Status</CardTitle>
                  <CardDescription>
                    {completionPercentage}% Complete - {matchedCount} of {totalTransactions} transactions matched
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-4">
                      <div 
                        className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Cards */}
              <Card className="border-l-4 border-green-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      Matched
                    </CardTitle>
                    <span className="text-2xl font-bold">{matchedCount}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(matchedAmount)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total matched amount</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-red-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      Unmatched
                    </CardTitle>
                    <span className="text-2xl font-bold">{unmatchedCount}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(unmatchedAmount)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total unmatched amount</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-yellow-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                      For Review
                    </CardTitle>
                    <span className="text-2xl font-bold">{reviewCount}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {formatCurrency(reviewAmount)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Amount needing review</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.filter(t => t.status === 'review').slice(0, 3).map(transaction => {
                    const match = findMatchingTransaction(transaction);
                    if (!match || transaction.source === 'ledger') return null;
                    
                    return (
                      <div key={transaction.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{transaction.description}</h3>
                            <p className="text-sm text-slate-500">{transaction.date}</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Review
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <span className="mr-2">Confidence:</span>
                          {renderConfidenceIndicator(transaction.confidence)}
                        </div>
                        
                        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <div className="text-sm">
                            <div>Bank: {formatCurrency(transaction.amount)}</div>
                            <div>Ledger: {formatCurrency(match.amount)}</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => confirmMatch(transaction.id)}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => rejectMatch(transaction.id)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Transactions</DropdownMenuItem>
                    <DropdownMenuItem>Bank Only</DropdownMenuItem>
                    <DropdownMenuItem>Ledger Only</DropdownMenuItem>
                    <DropdownMenuItem>Matched Pairs</DropdownMenuItem>
                    <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Confidence
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confidence Threshold</DialogTitle>
                      <DialogDescription>
                        Set the minimum confidence level for automatic matching.
                        Transactions below this level will require manual review.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500">Threshold: {confidenceThreshold}%</span>
                      </div>
                      <Slider
                        defaultValue={[confidenceThreshold]}
                        max={100}
                        step={5}
                        onValueChange={handleThresholdChange}
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>More Auto-Matches</span>
                        <span>Higher Accuracy</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="default" size="sm" className="h-10">
                  <Eye className="h-4 w-4 mr-2" />
                  Review All
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Match</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className={
                          transaction.status === 'matched' ? 'bg-green-50 dark:bg-green-900/20' :
                          transaction.status === 'review' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                        }>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{transaction.description}</span>
                              {transaction.category && (
                                <Badge variant="outline" className="w-fit mt-1">{transaction.category}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className={transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {transaction.source === 'bank' ? 'Bank' : 'Ledger'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {transaction.status === 'matched' && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Matched
                              </Badge>
                            )}
                            {transaction.status === 'unmatched' && (
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                Unmatched
                              </Badge>
                            )}
                            {transaction.status === 'review' && (
                              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Review
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {transaction.confidence ? (
                              renderConfidenceIndicator(transaction.confidence)
                            ) : (
                              <span className="text-sm text-slate-500">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {transaction.matchId ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <LinkIcon className="h-4 w-4 text-blue-500" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-4 w-4 text-blue-500" />
                                </Button>
                              )}
                              
                              {transaction.status === 'review' && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => confirmMatch(transaction.id)}
                                  >
                                    <Check className="h-4 w-4 text-green-500" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => rejectMatch(transaction.id)}
                                  >
                                    <X className="h-4 w-4 text-red-500" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredTransactions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                            No transactions found matching your search
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Transactions Requiring Review</CardTitle>
                <CardDescription>
                  {reviewCount} transaction pairs need your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {transactions.filter(t => t.status === 'review' && t.source === 'bank').map(bankTx => {
                    const ledgerTx = findMatchingTransaction(bankTx);
                    if (!ledgerTx) return null;
                    
                    return (
                      <div key={bankTx.id} className="p-4 sm:p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-2">Bank Transaction</h3>
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-sm text-slate-500">Date</p>
                                  <p className="font-medium">{bankTx.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-500">Amount</p>
                                  <p className={`font-medium ${bankTx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                    {formatCurrency(bankTx.amount)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-slate-500">Description</p>
                                <p className="font-medium">{bankTx.description}</p>
                              </div>
                              {bankTx.category && (
                                <div className="mt-2">
                                  <p className="text-sm text-slate-500">Category</p>
                                  <Badge variant="outline">{bankTx.category}</Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <Badge 
                                className="mb-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              >
                                {bankTx.confidence}% Match
                              </Badge>
                              <ArrowLeftRight className="h-6 w-6 text-slate-400" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-2">Ledger Entry</h3>
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-sm text-slate-500">Date</p>
                                  <p className="font-medium">{ledgerTx.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-500">Amount</p>
                                  <p className={`font-medium ${ledgerTx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                    {formatCurrency(ledgerTx.amount)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-slate-500">Description</p>
                                <p className="font-medium">{ledgerTx.description}</p>
                              </div>
                              {ledgerTx.category && (
                                <div className="mt-2">
                                  <p className="text-sm text-slate-500">Category</p>
                                  <Badge variant="outline">{ledgerTx.category}</Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => rejectMatch(bankTx.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject Match
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => confirmMatch(bankTx.id)}
                            >
                            <Check className="mr-2 h-4 w-4" />
                            Confirm Match
                          </Button>
                        </div>
                        
                        <Separator className="my-6" />
                      </div>
                    );
                  })}
                  
                  {transactions.filter(t => t.status === 'review' && t.source === 'bank').length === 0 && (
                    <div className="p-8 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">All caught up!</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        No transactions need your review at this time.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Potential Matches Card */}
            <Card>
              <CardHeader>
                <CardTitle>Unmatched Transactions</CardTitle>
                <CardDescription>
                  Transactions with no matching entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bank">
                  <TabsList className="w-full grid grid-cols-2 mb-4">
                    <TabsTrigger value="bank">Bank Entries</TabsTrigger>
                    <TabsTrigger value="ledger">Ledger Entries</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bank">
                    <div className="space-y-4">
                      {transactions
                        .filter(t => t.status === 'unmatched' && t.source === 'bank')
                        .map(tx => (
                        <div key={tx.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <div className="flex items-center text-sm text-slate-500 mt-1">
                              <span className="mr-4">{tx.date}</span>
                              <span className={tx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                {formatCurrency(tx.amount)}
                              </span>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Link className="mr-2 h-4 w-4" />
                                Find Match
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Find Matching Transaction</DialogTitle>
                                <DialogDescription>
                                  Select a ledger entry to match with this bank transaction.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mb-4">
                                  <p className="font-medium">{tx.description}</p>
                                  <div className="flex justify-between items-center mt-1 text-sm">
                                    <span>{tx.date}</span>
                                    <span className={tx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                      {formatCurrency(tx.amount)}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                  {transactions
                                    .filter(t => t.status === 'unmatched' && t.source === 'ledger')
                                    .map(ledgerTx => (
                                    <Button key={ledgerTx.id} variant="outline" className="w-full justify-start h-auto p-3">
                                      <div className="flex flex-col items-start">
                                        <p className="font-medium">{ledgerTx.description}</p>
                                        <div className="flex justify-between w-full items-center mt-1 text-sm">
                                          <span>{ledgerTx.date}</span>
                                          <span className={ledgerTx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                            {formatCurrency(ledgerTx.amount)}
                                          </span>
                                        </div>
                                      </div>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                      
                      {transactions.filter(t => t.status === 'unmatched' && t.source === 'bank').length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                          No unmatched bank transactions found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ledger">
                    <div className="space-y-4">
                      {transactions
                        .filter(t => t.status === 'unmatched' && t.source === 'ledger')
                        .map(tx => (
                        <div key={tx.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <div className="flex items-center text-sm text-slate-500 mt-1">
                              <span className="mr-4">{tx.date}</span>
                              <span className={tx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                {formatCurrency(tx.amount)}
                              </span>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Link className="mr-2 h-4 w-4" />
                                Find Match
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Find Matching Transaction</DialogTitle>
                                <DialogDescription>
                                  Select a bank entry to match with this ledger transaction.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mb-4">
                                  <p className="font-medium">{tx.description}</p>
                                  <div className="flex justify-between items-center mt-1 text-sm">
                                    <span>{tx.date}</span>
                                    <span className={tx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                      {formatCurrency(tx.amount)}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                  {transactions
                                    .filter(t => t.status === 'unmatched' && t.source === 'bank')
                                    .map(bankTx => (
                                    <Button key={bankTx.id} variant="outline" className="w-full justify-start h-auto p-3">
                                      <div className="flex flex-col items-start">
                                        <p className="font-medium">{bankTx.description}</p>
                                        <div className="flex justify-between w-full items-center mt-1 text-sm">
                                          <span>{bankTx.date}</span>
                                          <span className={bankTx.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                            {formatCurrency(bankTx.amount)}
                                          </span>
                                        </div>
                                      </div>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                      
                      {transactions.filter(t => t.status === 'unmatched' && t.source === 'ledger').length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                          No unmatched ledger transactions found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-blue-500" />
                    Reconciliation Summary
                  </CardTitle>
                  <CardDescription>
                    Overall status of your reconciliation process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    {/* This would be a chart component in real app */}
                    <div className="relative h-48 w-48">
                      {/* Circular progress indicators using divs with borders */}
                      <div className="absolute inset-0 rounded-full border-8 border-green-200 dark:border-green-900"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-green-500 dark:border-green-400"
                        style={{ 
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(completionPercentage * 0.02 * Math.PI)}% ${50 - 50 * Math.sin(completionPercentage * 0.02 * Math.PI)}%, ${completionPercentage >= 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%' : ''})` 
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold">{completionPercentage}%</span>
                          <p className="text-sm text-slate-500">Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                      <span className="text-sm font-medium">{matchedCount}</span>
                      <span className="text-xs text-slate-500">Matched</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mb-1"></div>
                      <span className="text-sm font-medium">{reviewCount}</span>
                      <span className="text-xs text-slate-500">Review</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mb-1"></div>
                      <span className="text-sm font-medium">{unmatchedCount}</span>
                      <span className="text-xs text-slate-500">Unmatched</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Summary
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>
                    Total amount reconciled and outstanding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Matched Amount</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(matchedAmount)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Under Review</span>
                        <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          {formatCurrency(reviewAmount)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Unmatched Amount</span>
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(unmatchedAmount)}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Bank Transactions</span>
                        <span className="text-lg font-bold">
                          {formatCurrency(matchedAmount + reviewAmount + unmatchedAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Reconciliation Report</CardTitle>
                  <CardDescription>
                    Generate detailed reports for your records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span className="font-medium">Full Report</span>
                      <span className="text-xs text-slate-500 mt-1">All transactions with details</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-6 flex flex-col">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span className="font-medium">Summary Report</span>
                      <span className="text-xs text-slate-500 mt-1">High-level overview</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-6 flex flex-col">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span className="font-medium">Unmatched Items</span>
                      <span className="text-xs text-slate-500 mt-1">List of all unmatched entries</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Reconciliation;