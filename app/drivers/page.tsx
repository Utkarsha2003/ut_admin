"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit, Plus, Search, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DriversPage() {
  // filter states
  const [districtFilter, setDistrictFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  // edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)

  const drivers = [
    { id: "D-1001", name: "David Johnson",   district: "North",   location: "123 Main St, North District",   vehicleType: "Sedan",   mobile: "+1 (555) 123-4567",   status: "active",   rating: 4.8, },
    { id: "D-1002", name: "Michael Brown",   district: "South",   location: "456 Oak Ave, South District",   vehicleType: "SUV",     mobile: "+1 (555) 234-5678",   status: "active",   rating: 4.6, },
    { id: "D-1003", name: "Sarah Davis",     district: "East",    location: "789 Pine Rd, East District",    vehicleType: "Sedan",   mobile: "+1 (555) 345-6789",   status: "active",   rating: 4.9, },
    { id: "D-1004", name: "James Wilson",    district: "West",    location: "321 Elm St, West District",     vehicleType: "Minivan", mobile: "+1 (555) 456-7890",   status: "inactive", rating: 4.5, },
    { id: "D-1005", name: "Robert Taylor",   district: "Central", location: "555 Cedar Ln, Central District", vehicleType: "Luxury",  mobile: "+1 (555) 567-8901",   status: "active",   rating: 4.7, },
    { id: "D-1006", name: "Thomas Anderson", district: "North",   location: "777 Maple Dr, North District",  vehicleType: "Sedan",   mobile: "+1 (555) 678-9012",   status: "active",   rating: 4.8, },
    { id: "D-1007", name: "Christopher Lee", district: "South",   location: "888 Birch Blvd, South District",vehicleType: "SUV",     mobile: "+1 (555) 789-0123",   status: "blocked",  rating: 3.9, },
    { id: "D-1008", name: "Daniel White",    district: "East",    location: "999 Spruce St, East District",   vehicleType: "Sedan",   mobile: "+1 (555) 890-1234",   status: "active",   rating: 4.6, },
  ]

  // consolidated filter + tab status
  const filteredDrivers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return drivers.filter((d) => {
      if (districtFilter !== "all" && d.district.toLowerCase() !== districtFilter) return false
      if (statusFilter   !== "all" && d.status   !== statusFilter)   return false

      if (q) {
        return (
          d.id.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [districtFilter, statusFilter, searchQuery])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":   return <Badge className="bg-green-500">Active</Badge>
      case "inactive": return <Badge variant="outline">Inactive</Badge>
      case "blocked":  return <Badge variant="destructive">Blocked</Badge>
      default:         return <Badge>{status}</Badge>
    }
  }

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Header + Add */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Driver Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            {/* Add Driver form (omitted for brevity) */}
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Drivers</CardTitle>
          <CardDescription>Filter by district, status, or search by name/location.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* District */}
            <div className="grid gap-2">
              <label htmlFor="district-filter" className="text-sm font-medium">District</label>
              <Select
                value={districtFilter}
                onValueChange={setDistrictFilter}
              >
                <SelectTrigger id="district-filter">
                  <SelectValue placeholder="All districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All districts</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <label htmlFor="status-filter" className="text-sm font-medium">Status</label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="grid gap-2">
              <label htmlFor="search-drivers" className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-drivers"
                  type="search"
                  placeholder="Search drivers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs + Table */}
      <Tabs defaultValue="all" onValueChange={(val) => setStatusFilter(val)}>
        <TabsList>
          <TabsTrigger value="all">All Drivers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="blocked">Blocked</TabsTrigger>
        </TabsList>

        {/* Each tab re-uses the same filtered list—statusFilter is driven by the tab */}
        {["all","active","inactive","blocked"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.id}</TableCell>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>{d.district}</TableCell>
                        <TableCell>{d.vehicleType}</TableCell>
                        <TableCell>{d.mobile}</TableCell>
                        <TableCell>{getStatusBadge(d.status)}</TableCell>
                        <TableCell>{d.rating}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditDriver(d)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Driver Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>Update driver information below.</DialogDescription>
          </DialogHeader>
          {/* ...form fields prefilled from selectedDriver */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
