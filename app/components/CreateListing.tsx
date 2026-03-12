"use client";

import { useState } from "react";
import { X, Upload, Plus, Check, Image as ImageIcon } from "lucide-react";

type ListingFormData = {
  title: string;
  propertyType: string;
  pricingAmount: string;
  currency: "EUR" | "USD";
  address: string;
  distanceFromEUL: string;
  description: string;
  features: string[];
};

export default function CreateListing() {
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    propertyType: "",
    pricingAmount: "",
    currency: "EUR",
    address: "",
    distanceFromEUL: "",
    description: "",
    features: [],
  });

  const [primaryImage, setPrimaryImage] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const propertyTypes = [
    "Studio (1+0)",
    "1+1 Apartment",
    "2+1 Apartment",
    "3+1 Apartment",
    "House",
    "Single Room",
  ];

  const quickFeatures = [
    "Water & electricity included",
    "Fully furnished",
    "WiFi available",
    "24/7 Security",
    "Parking available",
    "Close to EUL",
    "Quiet neighborhood",
    "Shared laundry",
    "Private bathroom",
    "Study desk",
    "Balcony",
    "Air conditioning",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addGalleryImage = () => {
    if (!galleryInput.trim()) return;
    if (galleryImages.length >= 7) return;

    setGalleryImages((prev) => [...prev, galleryInput.trim()]);
    setGalleryInput("");
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features
        : [...prev.features, feature],
    }));
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      propertyType: "",
      pricingAmount: "",
      currency: "EUR",
      address: "",
      distanceFromEUL: "",
      description: "",
      features: [],
    });
    setPrimaryImage("");
    setGalleryImages([]);
    setGalleryInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const formattedData = {
        title: formData.title,
        propertyType: formData.propertyType,
        pricing: {
          amount: Number(formData.pricingAmount),
          currency: formData.currency,
          period: "YEAR",
        },
        location: {
          addressText: formData.address,
          distanceFromEUL: Number(formData.distanceFromEUL),
        },
        description: formData.description,
        features: formData.features,
        images: {
          primary: primaryImage,
          gallery: galleryImages,
        },
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      setStatusMessage("✅ Property published successfully!");
      resetForm();
    } catch (error: any) {
      setIsSuccess(false);
      setStatusMessage(`❌ ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">List Your Property</h1>
        <p className="text-gray-600">Fill in the details below to publish your listing</p>
      </div>

      {statusMessage && (
        <div
          className={`mb-8 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 ${
            isSuccess
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isSuccess ? "bg-green-200" : "bg-red-200"
          }`}>
            {isSuccess ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Listing Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            placeholder="e.g., Modern Studio near EUL"
          />
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, propertyType: type }))
                }
                className={`px-5 py-2.5 rounded-xl border transition-all ${
                  formData.propertyType === type
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Yearly Price</label>
            <input
              type="number"
              name="pricingAmount"
              required
              value={formData.pricingAmount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="Street, City, Area"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Distance from EUL (km)</label>
            <input
              type="number"
              name="distanceFromEUL"
              required
              value={formData.distanceFromEUL}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
            placeholder="Describe your property in detail..."
          />
        </div>

        {/* Quick Features */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Quick Features</label>
          <p className="text-sm text-gray-500 mb-3">Click to add features to your listing</p>
          <div className="flex flex-wrap gap-2">
            {quickFeatures.map((feature) => {
              const isSelected = formData.features.includes(feature);
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => isSelected ? removeFeature(feature) : addFeature(feature)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    isSelected
                      ? "bg-black text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                  {feature}
                </button>
              );
            })}
          </div>
          {formData.features.length > 0 && (
            <div className="mt-3 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">Selected features:</p>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm flex items-center gap-1"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Image */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Primary Image URL</label>
          <input
            type="text"
            value={primaryImage}
            onChange={(e) => setPrimaryImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
        </div>

        {primaryImage && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Primary Preview</p>
            <div className="relative rounded-xl overflow-hidden border border-gray-300">
              <img
                src={primaryImage}
                alt="Primary Preview"
                className="w-full h-72 object-cover"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL")}
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Gallery Images</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="https://example.com/gallery-image.jpg"
              className="flex-1 border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={addGalleryImage}
              disabled={galleryImages.length >= 7}
              className="bg-black text-white px-6 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500">{galleryImages.length}/7 images added</p>
        </div>

        {galleryImages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Gallery Preview</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden border border-gray-300">
                    <img
                      src={img}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x400?text=Invalid+URL")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !primaryImage}
          className="w-full bg-black text-white py-4 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-8 text-lg"
        >
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}