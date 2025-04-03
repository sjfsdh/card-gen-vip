"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface BadgeData {
  id: string
  badgeType: string
  name: string
  designation: string
  organization: string
  department: string
  badgeId: string
  email: string
  phone: string
  validFrom: string
  validUntil: string
  address: string
  photo: string
  signature: string
  logo: string
  qrValue: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  layout?: string
  additionalFields: Record<string, string>
}

interface BadgePreviewProps {
  badgeData: BadgeData
}

export function BadgePreview({ badgeData }: BadgePreviewProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (badgeData.qrValue && qrCodeRef.current) {
      const verifyUrl = `https://vipup.online/verify?code=${badgeData.badgeId}`

      QRCode.toCanvas(
        qrCodeRef.current,
        verifyUrl || "https://vipup.online/verify",
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
  }, [badgeData.qrValue, badgeData.badgeId])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Corporate Badge
  const renderCorporateBadge = () => {
    const isVertical = badgeData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: badgeData.backgroundColor,
          color: badgeData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="flex p-4 items-center justify-between"
          style={{ backgroundColor: badgeData.primaryColor, color: badgeData.secondaryColor }}
        >
          {badgeData.logo ? (
            <img
              src={badgeData.logo || "/placeholder.svg"}
              alt="Corporate Logo"
              className="h-10 object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="text-lg font-bold">{badgeData.organization || "CORPORATION"}</div>
          )}
          <div className="text-right">
            <div className="text-xs opacity-80">Badge ID</div>
            <div className="text-sm font-bold">{badgeData.badgeId || "CORP-12345"}</div>
          </div>
        </div>

        <div className="p-4 flex flex-1">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{badgeData.name || "Employee Name"}</h3>
              <p className="text-sm">{badgeData.designation || "Position"}</p>
              <p className="text-xs opacity-80">{badgeData.department || "Department"}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Email:</span>
                <span className="text-xs truncate max-w-[140px]">{badgeData.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Phone:</span>
                <span className="text-xs">{badgeData.phone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid:</span>
                <span className="text-xs">
                  {formatDate(badgeData.validFrom)} - {formatDate(badgeData.validUntil)}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-4 flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 flex items-center justify-center"
              style={{ borderColor: badgeData.primaryColor, backgroundColor: "#f0f0f0" }}
            >
              {badgeData.photo ? (
                <img
                  src={badgeData.photo || "/placeholder.svg"}
                  alt="Employee"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  Photo
                </div>
              )}
            </div>
            <canvas ref={qrCodeRef} width="60" height="60"></canvas>
          </div>
        </div>
      </div>
    )
  }

  // Event Badge
  const renderEventBadge = () => {
    const isVertical = badgeData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: badgeData.backgroundColor,
          color: badgeData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-20 flex items-center justify-center p-4"
          style={{ backgroundColor: badgeData.primaryColor, color: badgeData.secondaryColor }}
        >
          {badgeData.logo ? (
            <img
              src={badgeData.logo || "/placeholder.svg"}
              alt="Event Logo"
              className="h-12 mr-3 object-contain"
              crossOrigin="anonymous"
            />
          ) : null}
          <div className="text-center">
            <h2 className="text-xl font-bold">{badgeData.organization || "EVENT NAME"}</h2>
            <p className="text-sm opacity-90">Conference Badge</p>
          </div>
        </div>

        <div className="p-4 flex flex-col items-center justify-between flex-1">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1">{badgeData.name || "Attendee Name"}</h3>
            <p className="text-md">{badgeData.designation || "Role / Position"}</p>
            <p className="text-sm opacity-80">{badgeData.department || "Company / Organization"}</p>
          </div>

          <div className="w-full flex justify-between items-end">
            <div>
              <p className="text-xs font-semibold">Badge ID: {badgeData.badgeId || "EVT-12345"}</p>
              <p className="text-xs">
                {formatDate(badgeData.validFrom)} - {formatDate(badgeData.validUntil)}
              </p>
            </div>

            <div>
              <canvas ref={qrCodeRef} width="60" height="60"></canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Visitor Badge
  const renderVisitorBadge = () => {
    const isVertical = badgeData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: badgeData.backgroundColor,
          color: badgeData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-16 flex items-center justify-center"
          style={{ backgroundColor: badgeData.primaryColor, color: badgeData.secondaryColor }}
        >
          <h2 className="text-xl font-bold">VISITOR</h2>
        </div>

        <div className="p-4 flex flex-col items-center flex-1">
          <div
            className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 flex items-center justify-center"
            style={{ borderColor: badgeData.primaryColor, backgroundColor: "#f0f0f0" }}
          >
            {badgeData.photo ? (
              <img
                src={badgeData.photo || "/placeholder.svg"}
                alt="Visitor"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <h3 className="font-bold text-lg text-center">{badgeData.name || "Visitor Name"}</h3>
          <p className="text-sm opacity-90 text-center">{badgeData.organization || "From: Company Name"}</p>

          <div className="mt-2 w-full grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-xs font-semibold">Visit Date</p>
              <p className="text-xs">{formatDate(badgeData.validFrom) || "Today's Date"}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold">Visitor ID</p>
              <p className="text-xs">{badgeData.badgeId || "VIS-12345"}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between w-full">
            <canvas ref={qrCodeRef} width="60" height="60"></canvas>

            <div className="text-right">
              <p className="text-xs font-semibold">Authorized by</p>
              {badgeData.signature ? (
                <img
                  src={badgeData.signature || "/placeholder.svg"}
                  alt="Signature"
                  className="h-8 object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-20 border-b border-gray-400"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Conference Badge
  const renderConferenceBadge = () => {
    const isVertical = badgeData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: badgeData.backgroundColor,
          color: badgeData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
          border: `2px solid ${badgeData.primaryColor}`,
        }}
      >
        <div
          className="p-3 flex justify-between items-center"
          style={{ borderBottom: `2px solid ${badgeData.primaryColor}` }}
        >
          {badgeData.logo ? (
            <img
              src={badgeData.logo || "/placeholder.svg"}
              alt="Conference Logo"
              className="h-8 object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="font-bold text-sm" style={{ color: badgeData.primaryColor }}>
              CONFERENCE
            </div>
          )}
          <div className="text-xs font-bold" style={{ color: badgeData.primaryColor }}>
            {badgeData.badgeId}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="text-center mb-2">
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: badgeData.primaryColor }}>
              {badgeData.department || "Track: Development"}
            </div>
            <h3 className="text-xl font-bold">{badgeData.name}</h3>
            <p className="text-sm">{badgeData.designation}</p>
            <p className="text-xs mt-1">{badgeData.organization}</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-xs">
              <div>{formatDate(badgeData.validFrom)}</div>
              <div style={{ color: badgeData.primaryColor }}>#{badgeData.badgeId}</div>
            </div>
            <canvas ref={qrCodeRef} width="60" height="60"></canvas>
          </div>
        </div>
      </div>
    )
  }

  // Staff Badge
  const renderStaffBadge = () => {
    const isVertical = badgeData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: badgeData.backgroundColor,
          color: badgeData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-12 flex items-center justify-between px-4"
          style={{ backgroundColor: badgeData.primaryColor, color: badgeData.secondaryColor }}
        >
          <h2 className="text-lg font-bold">STAFF</h2>
          {badgeData.logo ? (
            <img
              src={badgeData.logo || "/placeholder.svg"}
              alt="Staff Logo"
              className="h-8 object-contain"
              crossOrigin="anonymous"
            />
          ) : null}
        </div>

        <div className="p-4 flex flex-1">
          <div
            className="w-24 h-32 rounded overflow-hidden mr-4 border-2 flex items-center justify-center"
            style={{ borderColor: badgeData.primaryColor, backgroundColor: "#f0f0f0" }}
          >
            {badgeData.photo ? (
              <img
                src={badgeData.photo || "/placeholder.svg"}
                alt="Staff Personnel"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <div className="flex-1">
            <div
              className="inline-block px-2 py-0.5 mb-2 text-xs font-bold rounded"
              style={{ backgroundColor: badgeData.primaryColor, color: badgeData.secondaryColor }}
            >
              ACCESS LEVEL: A
            </div>
            <h3 className="font-bold text-lg">{badgeData.name || "Staff Personnel"}</h3>
            <p className="text-sm opacity-90">{badgeData.designation || "Staff Position"}</p>

            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">ID Number:</span>
                <span className="text-xs">{badgeData.badgeId || "STAFF-12345"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid Until:</span>
                <span className="text-xs">{formatDate(badgeData.validUntil) || "Dec 31, 2025"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Department:</span>
                <span className="text-xs">{badgeData.department || "Operations"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <canvas ref={qrCodeRef} width="60" height="60"></canvas>

              {badgeData.signature ? (
                <div className="flex flex-col items-center">
                  <img
                    src={badgeData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-8 object-contain"
                    crossOrigin="anonymous"
                  />
                  <span className="text-[8px]">Authorized Signature</span>
                </div>
              ) : (
                <div className="w-20 border-b border-gray-400 text-center">
                  <span className="text-[8px]">Authorized Signature</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the appropriate badge based on type
  const renderBadge = () => {
    switch (badgeData.badgeType) {
      case "event":
        return renderEventBadge()
      case "visitor":
        return renderVisitorBadge()
      case "conference":
        return renderConferenceBadge()
      case "staff":
        return renderStaffBadge()
      case "corporate":
      default:
        return renderCorporateBadge()
    }
  }

  return <div className="flex justify-center items-center w-full">{renderBadge()}</div>
}

