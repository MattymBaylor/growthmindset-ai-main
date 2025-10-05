import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactPage = () => {
  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: support@growthmindset.ai</p>
          <p>Phone: +1 (555) 123-4567</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
