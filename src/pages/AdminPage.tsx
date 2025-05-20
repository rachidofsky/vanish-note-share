
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

// In a real application, you would fetch this from a database or authentication system
// For demo purposes, we'll just hardcode an admin check
const isAdmin = () => {
  // In a real app, check user role from auth context or API
  // For demo purposes, return true to test the admin page
  return true;
};

const adSlots = [
  { name: 'Homepage Horizontal Banner', id: '9876543210', format: 'horizontal', location: 'Above footer' },
  { name: 'Note Page Rectangle', id: '5678901234', format: 'rectangle', location: 'Below note card' },
  { name: 'Created Page Banner', id: '1234567890', format: 'auto', location: 'Below card' },
];

const AdminPage = () => {
  const [publisherId, setPublisherId] = useState<string>('YOUR_ADSENSE_ID');
  const [slots, setSlots] = useState(adSlots);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [tempSlot, setTempSlot] = useState({ name: '', id: '', format: '', location: '' });

  // In a real app, load the current values from localStorage or a database
  useEffect(() => {
    const storedPublisherId = localStorage.getItem('adsense_publisher_id');
    if (storedPublisherId) {
      setPublisherId(storedPublisherId);
    }
    
    const storedSlots = localStorage.getItem('adsense_slots');
    if (storedSlots) {
      try {
        setSlots(JSON.parse(storedSlots));
      } catch (error) {
        console.error('Error parsing stored ad slots:', error);
      }
    }
  }, []);

  const handleSavePublisherId = () => {
    localStorage.setItem('adsense_publisher_id', publisherId);
    
    // In a real application, you would save this to a database and update the actual AdSense code
    // For this demo, we'll just update localStorage and show a toast
    toast.success('Publisher ID saved successfully');
  };

  const handleSaveSlots = () => {
    localStorage.setItem('adsense_slots', JSON.stringify(slots));
    
    // In a real application, you would save this to a database and update the actual AdSense code
    toast.success('Ad slots saved successfully');
    
    // Reload the page to apply changes
    // In a production app, you'd use a better state management approach
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleEditSlot = (index: number) => {
    setEditingSlot(index);
    setTempSlot({ ...slots[index] });
  };

  const handleSaveSlot = () => {
    if (editingSlot !== null) {
      const newSlots = [...slots];
      newSlots[editingSlot] = tempSlot;
      setSlots(newSlots);
      setEditingSlot(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSlot(null);
  };

  // If not admin, redirect to home
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AdSense Management</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Publisher Settings</CardTitle>
          <CardDescription>Configure your Google AdSense Publisher ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="publisher-id">AdSense Publisher ID</Label>
              <Input 
                id="publisher-id"
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePublisherId}>Save Publisher ID</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ad Units</CardTitle>
          <CardDescription>Configure your AdSense ad slots and formats</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ad Slot ID</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.map((slot, index) => (
                <TableRow key={index}>
                  {editingSlot === index ? (
                    <>
                      <TableCell>
                        <Input 
                          value={tempSlot.name} 
                          onChange={(e) => setTempSlot({ ...tempSlot, name: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={tempSlot.id} 
                          onChange={(e) => setTempSlot({ ...tempSlot, id: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={tempSlot.format} 
                          onChange={(e) => setTempSlot({ ...tempSlot, format: e.target.value })}
                          placeholder="auto, horizontal, rectangle, vertical"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={tempSlot.location} 
                          onChange={(e) => setTempSlot({ ...tempSlot, location: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveSlot}>Save</Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{slot.name}</TableCell>
                      <TableCell>{slot.id}</TableCell>
                      <TableCell>{slot.format}</TableCell>
                      <TableCell>{slot.location}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handleEditSlot(index)}>Edit</Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSlots}>Save All Ad Units</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPage;
