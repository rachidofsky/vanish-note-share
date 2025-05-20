
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About OneTimeNote</h1>
        <p className="text-lg text-muted-foreground">
          Secure, temporary communication for sensitive information
        </p>
      </div>
      
      <div className="space-y-8 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              OneTimeNote was created to solve a common problem in digital communication: 
              how to share sensitive information without leaving a permanent trace. 
              Unlike emails, messages, or traditional note-taking apps, OneTimeNote ensures 
              that sensitive information is automatically deleted after being read once.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              OneTimeNote uses a simple but effective approach to secure note sharing:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>You create a note containing sensitive information</li>
              <li>We generate a unique, secure link for that note</li>
              <li>When the link is accessed, the note is displayed once</li>
              <li>After viewing, the note is permanently deleted from our systems</li>
            </ol>
            
            <p className="text-sm text-muted-foreground mt-4">
              In a full implementation, notes would be stored encrypted in a database and properly 
              secured with server-side encryption. This demo version uses local storage for simplicity.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Personal</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>- Sharing Wi-Fi passwords</li>
                  <li>- Sending account credentials</li>
                  <li>- Private messages that shouldn't be saved</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Business</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>- Sharing access keys securely</li>
                  <li>- One-time access codes</li>
                  <li>- Sensitive meeting links</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Developers</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>- API keys and secrets</li>
                  <li>- Database credentials</li>
                  <li>- Environment variables</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Organizations</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>- Temporary access information</li>
                  <li>- Interview links</li>
                  <li>- Confidential document access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10">
        <Button asChild>
          <Link to="/">Create a Secure Note</Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
