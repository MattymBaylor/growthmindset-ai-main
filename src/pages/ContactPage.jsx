import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactPage = () => {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: support@growthmindset.ai</p>
            <p>Phone: +1 (555) 123-4567</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ContactPage;
