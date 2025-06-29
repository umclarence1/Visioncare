
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrightnessControl from '@/components/BrightnessControl';
import BreakControls from '@/components/BreakControls';
import { User, Settings, Bell, Shield } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
          Profile & Settings
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Customize your VisionCare experience and manage your preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-3 h-5 w-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">VisionCare User</h3>
              <p className="text-muted-foreground">Protecting your eyes since 2024</p>
            </div>
            
            <Button className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-3 h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Break Reminders</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Health Alerts</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Exercise Reminders</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Checkup Reminders</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <BrightnessControl />
        <BreakControls />
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-3 h-5 w-5" />
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Your privacy is our priority. All your health data is stored locally and encrypted for maximum security.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">Export Data</Button>
              <Button variant="outline">Clear History</Button>
              <Button variant="outline">Privacy Policy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
