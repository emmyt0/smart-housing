"use client";

import { useState } from "react";
import { X } from "lucide-react";

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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        List Your Property
      </h1>

      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            isSuccess
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Title */}
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Listing Title"
        />

        {/* Property Type */}
        <div className="flex flex-wrap gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, propertyType: type }))
              }
              className={`px-4 py-2 rounded-lg border transition ${
                formData.propertyType === type
                  ? "bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="number"
            name="pricingAmount"
            required
            value={formData.pricingAmount}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Yearly Price"
          />

          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Address"
          />
          <input
            type="number"
            name="distanceFromEUL"
            required
            value={formData.distanceFromEUL}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Distance from EUL (km)"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-4 py-3 min-h-[120px]"
          placeholder="Description"
        />

        {/* Primary Image */}
        <input
          type="text"
          value={primaryImage}
          onChange={(e) => setPrimaryImage(e.target.value)}
          placeholder="Primary Image (URL)"
          className="w-full border rounded-lg px-4 py-3"
        />

        {primaryImage && (
          <div className="mt-4">
            <img
              src={primaryImage}
              alt="Primary Preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Gallery */}
        <div className="flex gap-3">
          <input
            type="text"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="Gallery Image URL"
            className="flex-1 border rounded-lg px-4 py-3"
          />
          <button
            type="button"
            onClick={addGalleryImage}
            disabled={galleryImages.length >= 7}
            className="bg-black text-white px-4 rounded-lg disabled:opacity-50"
          >
            Add
          </button>
        </div>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Gallery ${index}`}
                  className="w-full h-40 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !primaryImage}
          className="w-full bg-black text-white py-4 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}
