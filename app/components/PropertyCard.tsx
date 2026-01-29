import { MapPin, Heart, Wifi, Car, Shield, Droplets, Zap, Home } from 'lucide-react';
import Image from 'next/image';

type PropertyCardProps = {
  propertyType: string;
  price: string;
  description: string;
  address: string;
  details: string;
  imageUrl: string;
};

const PropertyCard = ({
  propertyType,
  price,
  description,
  address,
  details,
  imageUrl,
}: PropertyCardProps) => {
  // Parse details into separate features
  const features = details.split(' • ');
  
  // Define icons for common features
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('wifi')) return <Wifi className="w-3.5 h-3.5" />;
    if (feature.toLowerCase().includes('water') || feature.toLowerCase().includes('bills')) return <Droplets className="w-3.5 h-3.5" />;
    if (feature.toLowerCase().includes('electricity')) return <Zap className="w-3.5 h-3.5" />;
    if (feature.toLowerCase().includes('security')) return <Shield className="w-3.5 h-3.5" />;
    if (feature.toLowerCase().includes('parking')) return <Car className="w-3.5 h-3.5" />;
    if (feature.toLowerCase().includes('furnish')) return <Home className="w-3.5 h-3.5" />;
    return null;
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
      {/* Property Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 "
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Top Row - Badge and Favorite */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-white/90 backdrop-blur-sm text-blue-700 font-semibold px-3 py-1.5 rounded-lg text-xs shadow-sm">
            {propertyType}
          </span>
          
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm">
            <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Bottom Row - Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <span className="font-bold text-gray-900 text-lg">
              {price}
            </span>
            <span className="text-xs text-gray-600 ml-1">/month</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Description */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
          {description}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-xs text-gray-600 mb-0.5">Near EUL Campus</h4>
            <p className="text-sm text-gray-900 font-medium truncate">{address}</p>
          </div>
        </div>

        {/* Features - Compact Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="text-blue-500">
                {getFeatureIcon(feature)}
              </div>
              <span className="text-xs text-gray-700 truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <button className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-black transition-colors duration-200 text-sm">
          Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;