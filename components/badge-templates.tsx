"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface BadgeTemplatesProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function BadgeTemplates({ selectedTemplate, onSelectTemplate }: BadgeTemplatesProps) {
  const templates = [
    {
      id: "corporate",
      name: "Corporate Badge",
      description: "Professional corporate identity badge with modern design",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop",
    },
    {
      id: "event",
      name: "Event Badge",
      description: "Conference or event attendee identification badge",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop",
    },
    {
      id: "visitor",
      name: "Visitor Pass",
      description: "Temporary visitor identification for guests and contractors",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=300&fit=crop",
    },
    {
      id: "conference",
      name: "Conference Badge",
      description: "Specialized badge for conference and summit attendees",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=600&h=300&fit=crop",
    },
    {
      id: "staff",
      name: "Staff Badge",
      description: "High-visibility identification for staff and team members",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=300&fit=crop",
    },
    {
      id: "security",
      name: "Security Badge",
      description: "High-security identification with enhanced features",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=300&fit=crop",
    },
  ]

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-500">Choose a Template</h2>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={`template-${template.id}`} className="sr-only" />
            <Label htmlFor={`template-${template.id}`} className="cursor-pointer">
              <Card
                className={`overflow-hidden transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-emerald-500" : "hover:border-muted-foreground/50"
                }`}
              >
                <CardContent className="p-0">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-40 object-cover border-b"
                    crossOrigin="anonymous"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

