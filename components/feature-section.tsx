import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Edit, Eye, FileImage, QrCode, Shield, Smartphone, Zap } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Edit className="h-10 w-10 text-emerald-600" />,
      title: "Easy Customization",
      description: "Customize every aspect of your badges and certificates with our intuitive editor.",
    },
    {
      icon: <Eye className="h-10 w-10 text-emerald-600" />,
      title: "Live Preview",
      description: "See changes in real-time as you customize your designs.",
    },
    {
      icon: <QrCode className="h-10 w-10 text-emerald-600" />,
      title: "QR & Barcodes",
      description: "Generate QR codes and barcodes for easy scanning and verification.",
    },
    {
      icon: <FileImage className="h-10 w-10 text-emerald-600" />,
      title: "Multiple Formats",
      description: "Download your creations as high-quality PNG or PDF files.",
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "Verification System",
      description: "Each credential comes with a unique verification code for authenticity.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-emerald-600" />,
      title: "Mobile Friendly",
      description: "Create and download from any device with our responsive design.",
    },
    {
      icon: <Zap className="h-10 w-10 text-emerald-600" />,
      title: "Fast & Lightweight",
      description: "Our application is optimized for speed and performance.",
    },
    {
      icon: <Download className="h-10 w-10 text-emerald-600" />,
      title: "Instant Download",
      description: "No waiting - download your creations instantly after designing.",
    },
  ]

  return (
    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to create professional credentials and certificates without any
            technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

