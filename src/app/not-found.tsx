import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] font-bengali px-2">
      <Card className="w-full max-w-lg p-6 space-y-6 shadow-lg animate-fade-in-up text-center my-8">
        <CardHeader>
          <div className="inline-block p-4 bg-destructive/10 rounded-full mb-4 mx-auto w-fit">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
            পেজটি খুঁজে পাওয়া যায়নি (404)
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই। লিঙ্কটি ভুল হতে পারে
            অথবা পেজটি সরিয়ে ফেলা হয়েছে।
          </p>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg">
            <Link href="/">হোম পেইজে ফিরে যান</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
