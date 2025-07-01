"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/date-picker"

export default function TransactionsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [statusFilter, setStatusFilter] = useState("all")
  const [driverFilter, setDriverFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const transactions = [
    {
      id: "T-5001",
      bookingId: "B-1234",
      customer: "John Smith",
      driver: "David Johnson",
      date: "2023-05-21",
      amount: "$45.00",
      driverCommission: "$36.00",
      platformFee: "$9.00",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5002",
      bookingId: "B-1235",
      customer: "Sarah Williams",
      driver: "Michael Brown",
      date: "2023-05-21",
      amount: "$32.50",
      driverCommission: "$26.00",
      platformFee: "$6.50",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5003",
      bookingId: "B-1236",
      customer: "Robert Davis",
      driver: "James Wilson",
      date: "2023-05-21",
      amount: "$28.75",
      driverCommission: "$23.00",
      platformFee: "$5.75",
      paymentMethod: "Wallet",
      status: "completed",
    },
      {
      id: "T-5004",
      bookingId: "B-1239",
      customer: "Lisa Rodriguez",
      driver: "Thomas Anderson",
      date: "2023-05-20",
      amount: "$42.75",
      driverCommission: "$34.20",
      platformFee: "$8.55",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5005",
      bookingId: "B-1240",
      customer: "William Martinez",
      driver: "Christopher Lee",
      date: "2023-05-20",
      amount: "$35.50",
      driverCommission: "$28.40",
      platformFee: "$7.10",
      paymentMethod: "Cash",
      status: "completed",
    },
    {
      id: "T-5006",
      bookingId: "B-1241",
      customer: "Elizabeth Taylor",
      driver: "Daniel White",
      date: "2023-05-19",
      amount: "$48.25",
      driverCommission: "$38.60",
      platformFee: "$9.65",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5007",
      bookingId: "B-1243",
      customer: "Patricia Brown",
      driver: "Andrew Wilson",
      date: "2023-05-18",
      amount: "$37.50",
      driverCommission: "$30.00",
      platformFee: "$7.50",
      paymentMethod: "Wallet",
      status: "completed",
    },
  ]

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date)
      const matchesStart = !startDate || txnDate >= startDate
      const matchesEnd = !endDate || txnDate <= endDate
      const matchesStatus = statusFilter === "all" || txn.status === statusFilter
      const matchesDriver = driverFilter === "all" || txn.driver.toLowerCase().includes(driverFilter.toLowerCase())
      const matchesPayment = paymentMethodFilter === "all" || txn.paymentMethod.toLowerCase().includes(paymentMethodFilter.toLowerCase())
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        txn.id.toLowerCase().includes(query) ||
        txn.customer.toLowerCase().includes(query) ||
        txn.driver.toLowerCase().includes(query) ||
        txn.bookingId.toLowerCase().includes(query)

      return matchesStart && matchesEnd && matchesStatus && matchesDriver && matchesPayment && matchesSearch
    })
  }, [startDate, endDate, statusFilter, driverFilter, paymentMethodFilter, searchQuery])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transaction Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
          <CardDescription>View and filter transactions by date, driver, or payment method.</CardDescription>
        </CardHeader>
        <CardContent>
          
          <div className="grid gap-4 md:grid-cols-5">
                        {/* Start Date */}
            <div className="grid gap-2">
              <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
              <div className="relative">
                <DatePicker
                  id="start-date"
                  selected={startDate}
                  onSelect={setStartDate}
                  placeholder="Select start date"
                  className="w-full"
                />
                {startDate && (
                  <button
                    type="button"
                    onClick={() => setStartDate(undefined)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <X className="w-3 h-2.5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* End Date */}
            <div className="grid gap-2">
              <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
              <div className="relative">
                <DatePicker
                  id="end-date"
                  selected={endDate}
                  onSelect={setEndDate}
                  placeholder="Select end date"
                  className="w-full"
                />
                {endDate && (
                  <button
                    type="button"
                    onClick={() => setEndDate(undefined)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <X className="w-3 h-2.5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="driver-filter" className="text-sm font-medium">Driver</label>
              <Select onValueChange={setDriverFilter}>
                <SelectTrigger id="driver-filter">
                  <SelectValue placeholder="All drivers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All drivers</SelectItem>
                  <SelectItem value="david johnson">David Johnson</SelectItem>
                  <SelectItem value="michael brown">Michael Brown</SelectItem>
                  <SelectItem value="james wilson">James Wilson</SelectItem>
                  <SelectItem value="thomas anderson">Thomas Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="payment-method" className="text-sm font-medium">Payment Method</label>
              <Select onValueChange={setPaymentMethodFilter}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All methods</SelectItem>
                  <SelectItem value="credit card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search" className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
          <CardDescription>Filtered transaction results.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Driver Commission</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.bookingId}</TableCell>
                  <TableCell>{txn.customer}</TableCell>
                  <TableCell>{txn.driver}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.driverCommission}</TableCell>
                  <TableCell>{txn.platformFee}</TableCell>
                  <TableCell>{txn.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
