import './App.css';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Input */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
        <label
          htmlFor="input"
          className="mb-2 font-semibold text-center md:text-left"
        >
          Your Text
        </label>
        <Textarea
          id="input"
          placeholder="Type your text here..."
          className="min-h-[300px]"
          aria-label="Text input for improvement"
        />
      </div>
      {/* Right: Output and Explanations */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-4 bg-muted">
        <Card>
          <CardHeader>
            <CardTitle>Improved Text</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground min-h-[100px]">
            Improved text will appear here
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Explanations</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground min-h-[100px]">
            Explanations will appear here
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
