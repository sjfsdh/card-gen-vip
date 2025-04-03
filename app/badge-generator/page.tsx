"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BadgePreview } from "@/components/badge-preview"
import { BadgeTemplates } from "@/components/badge-templates"
import { ColorPicker } from "@/components/color-picker"
import { FileUploader } from "@/components/file-uploader"
import { generateUniqueId } from "@/lib/utils"
import { ArrowLeft, Save } from "lucide-react"
import QRCode from "qrcode"
import { AdSpace } from "@/components/ad-space"

const sampleImages = {
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  signature:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Specimen_Signature.svg/320px-Specimen_Signature.svg.png",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png",
}

export default function BadgeGenerator() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrCodeRef = useRef<HTMLCanvasElement>(null)

  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState("corporate")
  const [photoPreview, setPhotoPreview] = useState(sampleImages.photo)
  const [signaturePreview, setSignaturePreview] = useState(sampleImages.signature)
  const [logoPreview, setLogoPreview] = useState(sampleImages.logo)
  const [badgeLayout, setBadgeLayout] = useState("horizontal")

  const [badgeData, setBadgeData] = useState({
    id: generateUniqueId(),
    badgeType: "corporate",
    name: "Alex Morgan",
    designation: "Product Manager",
    organization: "Innovate Solutions",
    department: "Product Development",
    badgeId: "EMP-78901",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 987-6543",
    validFrom: new Date().toISOString().split("T")[0],
    validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    address: "456 Tech Boulevard, Seattle, WA 98101",
    photo: sampleImages.photo,
    signature: sampleImages.signature,
    logo: sampleImages.logo,
    qrValue: "https://vipup.online/verify/EMP-78901",
    primaryColor: "#10b981",
    secondaryColor: "#ffffff",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    layout: "horizontal",
    additionalFields: {},
  })

  useEffect(() => {
    if (badgeData.qrValue && qrCodeRef.current) {
      QRCode.toCanvas(
        qrCodeRef.current,
        badgeData.qrValue || "https://vipup.online",
        {
          width: 80,
          height: 80,
          margin: 0,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [badgeData.qrValue])

  // Update badgeData when layout changes
  useEffect(() => {
    setBadgeData((prev) => ({
      ...prev,
      layout: badgeLayout,
    }))
  }, [badgeLayout])

  const handleInputChange = (field: string, value: string) => {
    setBadgeData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setBadgeData((prev) => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearPhoto = () => {
    setPhotoPreview("")
    setBadgeData((prev) => ({ ...prev, photo: "" }))
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string)
        setBadgeData((prev) => ({ ...prev, signature: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearSignature = () => {
    setSignaturePreview("")
    setBadgeData((prev) => ({ ...prev, signature: "" }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
        setBadgeData((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearLogo = () => {
    setLogoPreview("")
    setBadgeData((prev) => ({ ...prev, logo: "" }))
  }

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template)
    setBadgeData((prev) => ({ ...prev, badgeType: template }))
  }

  const handleColorChange = (colorType: string, color: string) => {
    setBadgeData((prev) => ({ ...prev, [colorType]: color }))
  }

  const handleLayoutChange = (value: string) => {
    setBadgeLayout(value)
    setBadgeData((prev) => ({ ...prev, layout: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to server
    // For now, we'll simulate by navigating to download page
    localStorage.setItem("badgeData", JSON.stringify(badgeData))
    router.push(`/download?type=badge&id=${badgeData.id}`)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center text-emerald-800 dark:text-emerald-400">Badge Generator</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <BadgeTemplates selectedTemplate={selectedTemplate} onSelectTemplate={handleTemplateSelect} />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={badgeData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Alex Morgan"
                    />
                  </div>

                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={badgeData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      placeholder="Product Manager"
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={badgeData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Innovate Solutions"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={badgeData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="Product Development"
                    />
                  </div>

                  <div>
                    <Label htmlFor="badgeId">Badge ID</Label>
                    <Input
                      id="badgeId"
                      value={badgeData.badgeId}
                      onChange={(e) => handleInputChange("badgeId", e.target.value)}
                      placeholder="EMP-78901"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={badgeData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="alex.morgan@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={badgeData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="validFrom">Valid From</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={badgeData.validFrom}
                        onChange={(e) => handleInputChange("validFrom", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={badgeData.validUntil}
                        onChange={(e) => handleInputChange("validUntil", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={badgeData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="456 Tech Boulevard, Seattle, WA 98101"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="qrValue">QR Code Value</Label>
                    <Input
                      id="qrValue"
                      value={badgeData.qrValue}
                      onChange={(e) => handleInputChange("qrValue", e.target.value)}
                      placeholder="https://vipup.online/verify/EMP-78901"
                    />
                    <p className="text-xs text-muted-foreground mt-1">This will generate a QR code on the badge</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Photo</Label>
                    <FileUploader
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      preview={photoPreview}
                      placeholder="Upload Photo"
                      onClear={handleClearPhoto}
                    />
                  </div>

                  <div>
                    <Label>Signature</Label>
                    <FileUploader
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      preview={signaturePreview}
                      placeholder="Upload Signature"
                      onClear={handleClearSignature}
                    />
                  </div>

                  <div>
                    <Label>Organization Logo</Label>
                    <FileUploader
                      accept="image/*"
                      onChange={handleLogoUpload}
                      preview={logoPreview}
                      placeholder="Upload Logo"
                      onClear={handleClearLogo}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Primary Color</Label>
                    <ColorPicker
                      color={badgeData.primaryColor}
                      onChange={(color) => handleColorChange("primaryColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Secondary Color</Label>
                    <ColorPicker
                      color={badgeData.secondaryColor}
                      onChange={(color) => handleColorChange("secondaryColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Text Color</Label>
                    <ColorPicker
                      color={badgeData.textColor}
                      onChange={(color) => handleColorChange("textColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Background Color</Label>
                    <ColorPicker
                      color={badgeData.backgroundColor}
                      onChange={(color) => handleColorChange("backgroundColor", color)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="badgeLayout">Badge Layout</Label>
                    <Select value={badgeLayout} onValueChange={handleLayoutChange}>
                      <SelectTrigger id="badgeLayout">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="horizontal">Horizontal</SelectItem>
                        <SelectItem value="vertical">Vertical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <AdSpace className="mt-8" />

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} className="flex items-center bg-emerald-600 hover:bg-emerald-700">
              <Save className="mr-2 h-4 w-4" />
              Save & Download
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-emerald-700 dark:text-emerald-500">
            Live Preview
          </h2>
          <div
            className="border-2 border-dashed border-emerald-200 dark:border-emerald-800 rounded-lg flex justify-center items-center p-8"
            style={{
              minHeight: badgeData.layout === "vertical" ? "450px" : "300px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: badgeData.layout === "vertical" ? "280px" : "400px",
              }}
            >
              <BadgePreview badgeData={badgeData} />
            </div>
          </div>
          <AdSpace className="mt-8" />
          <p className="text-xs text-muted-foreground mt-4 text-center">
            This is a preview of how your badge will look. Continue customizing to see changes in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}

