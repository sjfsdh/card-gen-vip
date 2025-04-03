import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "This platform saved me hours of work. I was able to create professional badges for our entire conference in minutes!",
      name: "Michael Rodriguez",
      title: "Event Coordinator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      quote:
        "The certificate generator is fantastic. Our online course graduates love the professional certificates they receive.",
      name: "Priya Sharma",
      title: "Education Director",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      quote:
        "I needed employee badges for our growing team and this tool made it incredibly easy. The QR code feature was especially useful.",
      name: "James Wilson",
      title: "HR Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  ]

  return (
    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thousands of organizations use our platform to create professional credentials and certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

