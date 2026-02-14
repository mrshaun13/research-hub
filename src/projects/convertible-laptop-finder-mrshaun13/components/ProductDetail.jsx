import React from 'react';
import { ArrowLeft, ExternalLink, Star, Check, X, ShoppingCart, Award } from 'lucide-react';
import { productsWithDerived, BRAND_COLORS, USE_CASES } from '../data/products';
import { productDetails, getAggregateRating } from '../data/productDetails';

const ProductDetail = ({ productId, onBack }) => {
  const product = productsWithDerived.find(p => p.id === productId);
  const detail = productDetails[productId];
  if (!product || !detail) return <p className="text-gray-400">Product not found.</p>;

  const agg = getAggregateRating(productId);

  const StarDisplay = ({ stars }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(stars) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
      ))}
      <span className="text-white text-sm font-semibold ml-1">{stars}</span>
    </div>
  );

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Comparison
      </button>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: BRAND_COLORS[product.brand] }}>
          {product.brand.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <p className="text-gray-400 text-sm">{detail.manufacturer} &middot; {detail.madeIn} &middot; {detail.warranty} &middot; {detail.releaseYear}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl font-bold text-emerald-400">${product.price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">{product.priceRange}</span>
          </div>
          {agg.avgStars && (
            <div className="flex items-center gap-2 mt-1">
              <StarDisplay stars={agg.avgStars} />
              <span className="text-gray-500 text-xs">({agg.totalReviews.toLocaleString()} reviews across {agg.sources} sources)</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-white font-semibold text-sm mb-3">Full Specifications</h3>
          <div className="space-y-1.5">
            {Object.entries(detail.specs).map(([key, val]) => (
              <div key={key} className="flex text-xs">
                <span className="text-gray-500 w-28 flex-shrink-0">{key}</span>
                <span className="text-gray-300">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-white font-semibold text-sm mb-3">Ratings Breakdown</h3>
            <div className="space-y-2">
              {detail.ratings.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-xs font-medium w-24">{r.source}</span>
                    <StarDisplay stars={r.stars} />
                  </div>
                  <div className="flex items-center gap-2">
                    {r.reviewCount && <span className="text-gray-500 text-xs">{r.reviewCount.toLocaleString()} reviews</span>}
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-white font-semibold text-sm mb-3">
              <ShoppingCart className="w-4 h-4 inline mr-1 text-emerald-400" /> Where to Buy
            </h3>
            <div className="space-y-2">
              {detail.purchaseLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-700/30 rounded-lg px-3 py-2 hover:bg-gray-700/50 transition-colors group"
                >
                  <span className="text-gray-300 text-xs font-medium">{link.retailer}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold text-sm">${link.price.toLocaleString()}</span>
                    {link.inStock && <span className="text-emerald-500 text-[10px]">In Stock</span>}
                    <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-teal-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
          <h3 className="text-emerald-400 font-semibold text-sm mb-2 flex items-center gap-1.5">
            <Check className="w-4 h-4" /> Pros (from real user reviews)
          </h3>
          <ul className="space-y-1.5">
            {detail.prosFromReviews.map((pro, i) => (
              <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-950/30 rounded-xl p-4 border border-red-800/30">
          <h3 className="text-red-400 font-semibold text-sm mb-2 flex items-center gap-1.5">
            <X className="w-4 h-4" /> Cons (from real user reviews)
          </h3>
          <ul className="space-y-1.5">
            {detail.consFromReviews.map((con, i) => (
              <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {product.useCaseRatings && (
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 mb-6">
          <h3 className="text-white font-semibold text-sm mb-3">Use Case Fit</h3>
          <div className="space-y-2">
            {USE_CASES.map(uc => {
              const rating = product.useCaseRatings[uc.key] || 0;
              return (
                <div key={uc.key} className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs w-32 flex-shrink-0">{uc.label}</span>
                  <div className="flex-1 bg-gray-700/30 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${rating >= 4 ? 'bg-emerald-500' : rating >= 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium w-6 text-right ${rating >= 4 ? 'text-emerald-400' : rating >= 3 ? 'text-amber-400' : 'text-red-400'}`}>
                    {rating}/5
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-teal-400" /> Verdict
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">{product.verdict}</p>
        {product.highlights && (
          <div className="flex flex-wrap gap-2 mt-3">
            {product.highlights.map((h, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-900/30 text-teal-400 border border-teal-800/30">
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
