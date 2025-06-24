import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sparkles,
  Download,
  RefreshCw,
  CreditCard,
  Palette,
  Type,
  Volume2,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [credits, setCredits] = useState(5);
  const [formData, setFormData] = useState({
    brandName: "",
    slogan: "",
    description: "",
    colorPreference: "",
    logoStyle: "",
  });

  const handleGenerate = async () => {
    if (credits <= 0) {
      alert(
        "You need credits to generate logos. Please purchase more credits.",
      );
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const mockLogos = [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80",
        "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=80",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80",
      ];
      setGeneratedLogos(mockLogos);
      setCredits((prev) => prev - 1);
      setIsGenerating(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-gray-900">
                LogoGenius
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{credits} credits</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                      alt={user?.email || ""}
                    />
                    <AvatarFallback>
                      {user?.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logo Generation Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Logo
              </h1>
              <p className="text-gray-600">
                Fill out the form below to generate 3 unique AI-powered logo
                variations for your brand.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Logo Generation Form
                </CardTitle>
                <CardDescription>
                  Provide details about your brand to generate professional
                  logos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name *</Label>
                  <Input
                    id="brandName"
                    placeholder="Enter your brand name"
                    value={formData.brandName}
                    onChange={(e) =>
                      handleInputChange("brandName", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slogan">Slogan/Tagline</Label>
                  <Input
                    id="slogan"
                    placeholder="Your brand's slogan (optional)"
                    value={formData.slogan}
                    onChange={(e) =>
                      handleInputChange("slogan", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business, target audience, and what makes you unique..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colorPreference">Color Preference</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("colorPreference", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose color preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue Tones</SelectItem>
                      <SelectItem value="red">Red Tones</SelectItem>
                      <SelectItem value="green">Green Tones</SelectItem>
                      <SelectItem value="purple">Purple Tones</SelectItem>
                      <SelectItem value="orange">Orange Tones</SelectItem>
                      <SelectItem value="black-white">Black & White</SelectItem>
                      <SelectItem value="multicolor">Multicolor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoStyle">Logo Style</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("logoStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose logo style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">
                        Modern & Minimalist
                      </SelectItem>
                      <SelectItem value="classic">
                        Classic & Traditional
                      </SelectItem>
                      <SelectItem value="playful">
                        Playful & Creative
                      </SelectItem>
                      <SelectItem value="professional">
                        Professional & Corporate
                      </SelectItem>
                      <SelectItem value="artistic">
                        Artistic & Abstract
                      </SelectItem>
                      <SelectItem value="tech">Tech & Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={
                      !formData.brandName ||
                      !formData.description ||
                      isGenerating ||
                      credits <= 0
                    }
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating Logos...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate 3 Logos (1 Credit)
                      </>
                    )}
                  </Button>
                  {credits <= 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      You need credits to generate logos. Purchase more credits
                      to continue.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results and Credit System */}
          <div className="space-y-6">
            {/* Credit System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Credit System
                </CardTitle>
                <CardDescription>
                  Track your logo generation usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Available Credits</span>
                  <Badge
                    variant="secondary"
                    className="text-lg font-bold px-3 py-1"
                  >
                    {credits}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 1 credit = 3 logo variations</p>
                  <p>• High-resolution downloads included</p>
                  <p>• Brand guide generation included</p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy More Credits
                </Button>
              </CardContent>
            </Card>

            {/* Generated Logos */}
            {generatedLogos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Generated Logos
                  </CardTitle>
                  <CardDescription>
                    Choose your favorite and download in high resolution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {generatedLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={logo}
                            alt={`Logo variation ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download PNG
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download SVG
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Brand Guide Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Complete Brand Guide
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        Color Palette
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Type className="h-4 w-4" />
                        Font Suggestions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Volume2 className="h-4 w-4" />
                        Tone Guide
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {generatedLogos.length === 0 && !isGenerating && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ready to Create Your Logo?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Fill out the form on the left to generate 3 unique logo
                      variations powered by AI.
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>✨ AI-powered generation</p>
                      <p>📱 High-resolution downloads</p>
                      <p>🎨 Complete brand guide included</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
