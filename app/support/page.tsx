import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Coffee, Gift } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              Ủng Hộ Tôi
            </h1>
            <p className="text-muted-foreground text-lg">
              Nếu bạn thích dự án này và muốn ủng hộ tôi tiếp tục phát triển,
              bạn có thể ủng hộ qua các hình thức dưới đây
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Mua cho tôi một ly cà phê
                </CardTitle>
                <CardDescription>Ủng hộ qua QR Code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <img
                      src="/images/QR.jpg"
                      alt="QR Code MoMo"
                      className="w-96 h-auto"
                    />
                  </div>
                  <p className="font-semibold">Quét mã QR</p>
                  <p className="text-sm text-muted-foreground">
                    Momo: 0764466624
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tại sao ủng hộ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Duy trì server</h3>
                  <p className="text-sm text-muted-foreground">
                    Chi phí hosting và domain để duy trì website
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Phát triển tính năng</h3>
                  <p className="text-sm text-muted-foreground">
                    Thêm nhiều tính năng mới và cải thiện trải nghiệm
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Động lực</h3>
                  <p className="text-sm text-muted-foreground">
                    Sự ủng hộ của bạn là động lực để tôi tiếp tục
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Cảm ơn bạn đã sử dụng và ủng hộ dự án! ❤️
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
