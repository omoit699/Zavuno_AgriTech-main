import React, { useState } from "react";

export default function ZavunoPlatform() {
  const [farmerEmail, setFarmerEmail] = useState("");
  const [farmerPassword, setFarmerPassword] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPassword, setBuyerPassword] = useState("");
  const [transporterEmail, setTransporterEmail] = useState("");
  const [transporterPassword, setTransporterPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] =
    useState("MTN Mobile Money");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [produceName, setProduceName] = useState("");
  const [produceQuantity, setProduceQuantity] = useState("");
  const [producePrice, setProducePrice] = useState("");
  const [produceDescription, setProduceDescription] = useState("");
  const [produceImage, setProduceImage] = useState("");
  const [produceListings, setProduceListings] = useState([]);
=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7
=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7

  const handleFarmerSignIn = () => {
    alert(`Farmer Sign In - Email: ${farmerEmail}`);
  };

  const handleBuyerSignIn = () => {
    alert(`Buyer Sign In - Email: ${buyerEmail}`);
  };

  const handleTransporterSignIn = () => {
    alert(`Transporter Sign In - Email: ${transporterEmail}`);
  };

  const handlePayment = () => {
    if (!phoneNumber || !amount) {
      alert("Please fill in all payment fields");
      return;
    }
    alert(
      `Payment initiated - Amount: ${amount}, Provider: ${mobileMoneyProvider}`,
    );
  };

  const handleGetWeather = () => {
    if (!location.trim()) {
      alert("Please enter a location");
      return;
    }
    // Simulate weather data
    const mockWeather = {
      location: location,
      temperature: Math.floor(Math.random() * 15) + 20,
      condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 40) + 50,
      rainfall: Math.floor(Math.random() * 50) + 10,
    };
    setWeatherData(mockWeather);
  };

  const handleGetAiAdvice = () => {
    if (!aiQuery.trim()) {
      alert("Please enter an agricultural question");
      return;
    }
    // Simulate AI agricultural advice
    const adviceDatabase = {
      maize:
        "For maize cultivation: Plant during rainy season, use certified seeds, maintain 75cm spacing, and apply balanced fertilizer (10:10:10) at 3 weeks. Monitor for armyworm pests.",
      beans:
        "For beans: Prepare soil with organic matter, plant after rains, provide support trellises, harvest when pods turn brown. Beans fix nitrogen, so rotate crops efficiently.",
      cassava:
        "For cassava: Use healthy stem cuttings, plant in ridges, require well-drained soil, minimal fertilizer needed. Harvest after 12-18 months when leaves yellow.",
      banana:
        "For banana farming: Space plants 2-3 meters apart, mulch heavily, provide adequate water (70mm/month), control black Sigatoka disease, fertilize monthly.",
      tomato:
        "For tomatoes: Use disease-resistant varieties, stagger planting for continuous harvest, stake/cage plants, water consistently, scout for pests weekly.",
      default:
        "General agricultural advice: Ensure good soil preparation, use improved crop varieties, practice crop rotation, manage water efficiently, and apply integrated pest management techniques.",
    };

    const query = aiQuery.toLowerCase();
    let advice = adviceDatabase.default;

    if (query.includes("maize") || query.includes("corn"))
      advice = adviceDatabase.maize;
    else if (query.includes("bean") || query.includes("pulse"))
      advice = adviceDatabase.beans;
    else if (query.includes("cassava")) advice = adviceDatabase.cassava;
    else if (query.includes("banana")) advice = adviceDatabase.banana;
    else if (query.includes("tomato")) advice = adviceDatabase.tomato;

    setAiAdvice(advice);
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleUploadProduce = () => {
    if (!produceName.trim() || !produceQuantity || !producePrice) {
      alert("Please fill in all required fields (Name, Quantity, Price)");
      return;
    }

    const newProduce = {
      id: Date.now(),
      name: produceName,
      quantity: produceQuantity,
      price: producePrice,
      description: produceDescription,
      image:
        produceImage ||
        "https://images.unsplash.com/photo-1488459716781-8c63cc00022b?q=80&w=400&auto=format&fit=crop",
      uploadedDate: new Date().toLocaleDateString(),
    };

    setProduceListings([newProduce, ...produceListings]);
    setProduceName("");
    setProduceQuantity("");
    setProducePrice("");
    setProduceDescription("");
    setProduceImage("");
    alert("✅ Your produce has been listed successfully!");
  };

=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7
=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-green-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Zavuno</h1>
            <p className="text-sm text-green-100">
              Empowering Farmers, Changing Lives.
            </p>
          </div>
        </div>
      </header>

      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
            Africa’s Trusted Agricultural Marketplace
          </h1>

          <p className="mt-6 text-lg max-w-2xl text-gray-200 leading-8">
            Zavuno connects farmers, buyers, transporters, and investors through
            trusted technology and mobile money.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800">
            Sign Into Zavuno
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="bg-green-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-700">
                Farmer Sign In
              </h3>

              <input
                type="email"
                placeholder="Farmer Email"
                value={farmerEmail}
                onChange={(e) => setFarmerEmail(e.target.value)}
                className="w-full mt-6 p-4 rounded-xl border"
              />

              <input
                type="password"
                placeholder="Password"
                value={farmerPassword}
                onChange={(e) => setFarmerPassword(e.target.value)}
                className="w-full mt-4 p-4 rounded-xl border"
              />

              <button
                onClick={handleFarmerSignIn}
                className="w-full mt-6 bg-green-700 text-white py-4 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Sign In as Farmer
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border">
              <h3 className="text-2xl font-bold text-green-700">
                Buyer Sign In
              </h3>

              <input
                type="email"
                placeholder="Buyer Email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full mt-6 p-4 rounded-xl border"
              />

              <input
                type="password"
                placeholder="Password"
                value={buyerPassword}
                onChange={(e) => setBuyerPassword(e.target.value)}
                className="w-full mt-4 p-4 rounded-xl border"
              />

              <button
                onClick={handleBuyerSignIn}
                className="w-full mt-6 bg-green-800 text-white py-4 rounded-xl font-semibold hover:bg-green-900 transition"
              >
                Sign In as Buyer
              </button>
            </div>

            <div className="bg-cyan-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-cyan-700">
                Transporter Sign In
              </h3>

              <input
                type="email"
                placeholder="Transporter Email"
                value={transporterEmail}
                onChange={(e) => setTransporterEmail(e.target.value)}
                className="w-full mt-6 p-4 rounded-xl border"
              />

              <input
                type="password"
                placeholder="Password"
                value={transporterPassword}
                onChange={(e) => setTransporterPassword(e.target.value)}
                className="w-full mt-4 p-4 rounded-xl border"
              />

              <button
                onClick={handleTransporterSignIn}
                className="w-full mt-6 bg-cyan-700 text-white py-4 rounded-xl font-semibold hover:bg-cyan-800 transition"
              >
                Sign In as Transporter
              </button>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-yellow-800 mb-4">
            🥬 Farmer's Marketplace - Sell Your Produce
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Upload your fresh produce and connect directly with buyers across
            Africa
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-yellow-700 mb-6">
                📤 Upload Your Produce
              </h3>

              <input
                type="text"
                placeholder="Product Name (e.g., Maize, Tomatoes, Beans)"
                value={produceName}
                onChange={(e) => setProduceName(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-yellow-300 mb-4"
              />

              <input
                type="number"
                placeholder="Quantity (in kg)"
                value={produceQuantity}
                onChange={(e) => setProduceQuantity(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-yellow-300 mb-4"
              />

              <input
                type="number"
                placeholder="Price per Unit (UGX)"
                value={producePrice}
                onChange={(e) => setProducePrice(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-yellow-300 mb-4"
              />

              <textarea
                placeholder="Product Description (quality, freshness, etc.)"
                value={produceDescription}
                onChange={(e) => setProduceDescription(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-yellow-300 mb-4 h-24 resize-none"
              />

              <input
                type="url"
                placeholder="Image URL (optional - leave blank for default)"
                value={produceImage}
                onChange={(e) => setProduceImage(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-yellow-300 mb-4"
              />

              <button
                onClick={handleUploadProduce}
                className="w-full bg-yellow-600 text-white py-4 rounded-xl font-semibold hover:bg-yellow-700 transition"
              >
                ✅ List Produce for Sale
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                💡 Why Sell on Zavuno?
              </h3>
              <div className="space-y-3 text-gray-800">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>
                    <strong>Direct Buyer Access:</strong> Connect with serious
                    buyers without middlemen
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>
                    <strong>Fair Prices:</strong> You control the price of your
                    produce
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>
                    <strong>Instant Reach:</strong> Farmers, businesses, and
                    restaurants find your products
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>
                    <strong>Safe Payments:</strong> Mobile money payments with
                    protection
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>
                    <strong>Transportation:</strong> Easy access to trusted
                    transporters
                  </span>
                </p>
              </div>
            </div>
          </div>

          {produceListings.length > 0 && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-yellow-800 mb-8">
                📦 Active Listings ({produceListings.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {produceListings.map((produce) => (
                  <div
                    key={produce.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                  >
                    <img
                      src={produce.image}
                      alt={produce.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-green-700 mb-2">
                        {produce.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {produce.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <p className="text-lg font-semibold text-yellow-700">
                          💰 UGX {produce.price}/unit
                        </p>
                        <p className="text-gray-700">
                          📊 Available: {produce.quantity}kg
                        </p>
                        <p className="text-gray-500 text-sm">
                          Listed: {produce.uploadedDate}
                        </p>
                      </div>
                      <button className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition">
                        💬 Contact Buyer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7
=======
>>>>>>> 6bb8cce5db1e3d6e3050ce7bf724dc65f7234fe7
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-4">
            🌾 Farmers in Action
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Meet our community of hardworking farmers nurturing the land with
            hope and dedication
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop"
                alt="Farmer in garden with crops"
                className="w-full h-96 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  ✨ In the Garden
                </h3>
                <p className="text-gray-700">
                  Our farmers work tirelessly in their gardens, cultivating
                  healthy crops with modern techniques and traditional wisdom.
                  Every seed planted is a promise of a better tomorrow.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img
                src="https://images.unsplash.com/photo-1488459716781-8c63cc00022b?q=80&w=800&auto=format&fit=crop"
                alt="Farmers selling produce at market"
                className="w-full h-96 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  💼 Marketplace Success
                </h3>
                <p className="text-gray-700">
                  At our marketplace, farmers proudly sell their fresh, quality
                  products. Direct connections with buyers ensure fair prices
                  and sustainable livelihoods for our agricultural partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-red-700 mb-6">
            🌍 Farmers: The Heroes Feeding the World
          </h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="text-xl font-semibold text-red-600">
              Without farmers, there is no life.
            </span>{" "}
            Food is not just sustenance—it is life itself. Every meal on every
            table, in every home across Africa and the world, begins with a
            farmer who believed in the soil, trusted in God, and worked with
            unwavering dedication.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad576?q=80&w=800&auto=format&fit=crop"
                alt="Farmer with harvested produce"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">
                  🏆 Harvest Pride
                </h3>
                <p className="text-gray-700">
                  Farmers display their harvest with pride—knowing they have fed
                  their families and communities.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1488459716781-8c63cc00022b?q=80&w=800&auto=format&fit=crop"
                alt="Farmers at marketplace selling"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">
                  💰 Market Power
                </h3>
                <p className="text-gray-700">
                  At the marketplace, farmers become entrepreneurs—building
                  livelihoods and transforming communities.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad576?q=80&w=800&auto=format&fit=crop"
                alt="Fresh produce display"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">
                  🥗 Life Itself
                </h3>
                <p className="text-gray-700">
                  Fresh, nutrient-rich produce grown by African farmers
                  nourishes millions. Food is life.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-green-200">
            <h3 className="text-3xl font-bold text-center text-green-800 mb-8">
              🌟 Empowering Farmers. Changing Lives. Liberating Africa.
            </h3>
            <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
              <p>
                <span className="text-2xl font-bold text-green-700">
                  You are not just farmers.
                </span>{" "}
                You are the backbone of nations. You are the keepers of
                tradition and the builders of the future. In every seed you
                plant, you plant hope for millions.
              </p>
              <p>
                <span className="text-2xl font-bold text-green-700">
                  Farming liberates African lives
                </span>{" "}
                because it brings dignity, independence, and prosperity. When a
                farmer succeeds, entire communities rise. When a farmer feeds
                their family, they feed their dreams. When African farmers
                thrive, Africa thrives.
              </p>
              <p>
                <span className="text-2xl font-bold text-green-700">
                  You deserve to be celebrated.
                </span>{" "}
                Every grain of maize, every bean harvest, every basket of
                tomatoes you bring to market is an act of courage and love. You
                feed the world. You sustain life. You are heroes.
              </p>
              <p className="text-center text-xl font-semibold text-green-700 mt-8 pt-8 border-t-2 border-green-200">
                🙏 This is your platform. This is your victory. This is your
                future. <br />
                <span className="text-red-600">
                  Empowering Farmers. Changing Lives.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-purple-800 mb-6">
              💪 Your Journey to Success
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl">
                🙏{" "}
                <span className="font-semibold text-purple-700">
                  Trust in God's Plan
                </span>{" "}
                - Every harvest begins with faith. God provides the seasons, the
                rain, and the strength to work the land.
              </p>
              <p className="text-xl">
                🌟{" "}
                <span className="font-semibold text-blue-700">
                  Have Hope in Tomorrow
                </span>{" "}
                - Your hard work today plants seeds for a prosperous future. No
                effort goes unnoticed; every step forward counts.
              </p>
              <p className="text-xl">
                🤝{" "}
                <span className="font-semibold text-green-700">
                  Community Support
                </span>{" "}
                - You are not alone. Zavuno connects you with buyers,
                transporters, and other farmers who believe in your success.
              </p>
              <p className="text-xl">
                🎯{" "}
                <span className="font-semibold text-orange-700">
                  Sustainable Growth
                </span>{" "}
                - With weather forecasts, AI advice, and fair-trade practices,
                we help you grow both crops and dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-800">
            Mobile Money Payments
          </h2>

          <div className="bg-white rounded-3xl p-10 shadow-lg mt-10">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-4 p-4 rounded-xl border"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-4 p-4 rounded-xl border"
            />

            <select
              value={mobileMoneyProvider}
              onChange={(e) => setMobileMoneyProvider(e.target.value)}
              className="w-full mt-4 p-4 rounded-xl border"
            >
              <option>MTN Mobile Money</option>
              <option>Airtel Money</option>
            </select>

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-green-700 text-white py-4 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            🌤️ Weather Forecast for Farming
          </h2>
          <p className="text-gray-600 mb-8">
            Check weather conditions in your region to plan your farming
            activities
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <input
                type="text"
                placeholder="Enter your location (e.g., Kampala, Jinja)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-blue-300"
              />

              <button
                onClick={handleGetWeather}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Get Weather
              </button>
            </div>

            {weatherData && (
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 shadow-lg text-white">
                <h3 className="text-2xl font-bold mb-4">
                  📍 {weatherData.location}
                </h3>
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold">Temperature:</span>{" "}
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Condition:</span>{" "}
                    {weatherData.condition}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Humidity:</span>{" "}
                    {weatherData.humidity}%
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Expected Rainfall:</span>{" "}
                    {weatherData.rainfall}mm
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">
            🤖 AI Agricultural Advice
          </h2>
          <p className="text-gray-600 mb-8">
            Get expert AI-powered recommendations for your crops. Ask about
            maize, beans, cassava, banana, tomato, and more!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <textarea
                placeholder="Ask your agricultural question... e.g., 'How do I grow maize?' or 'Best practices for tomatoes?'"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-orange-300 h-32 resize-none"
              />

              <button
                onClick={handleGetAiAdvice}
                className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-semibold hover:bg-orange-700 transition"
              >
                Get AI Advice
              </button>
            </div>

            {aiAdvice && (
              <div className="bg-gradient-to-br from-orange-400 to-amber-600 rounded-3xl p-8 shadow-lg text-white">
                <h3 className="text-2xl font-bold mb-4">
                  💡 Expert Recommendation
                </h3>
                <p className="text-lg leading-relaxed">{aiAdvice}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">WhatsApp Customer Support</h2>

          <a href="https://wa.me/256790206354" target="_blank" rel="noreferrer">
            <button className="mt-8 bg-white text-green-900 px-8 py-4 rounded-2xl font-bold">
              Chat on WhatsApp
            </button>
          </a>
        </div>
      </section>

      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold">Contact Information</h3>

          <div className="mt-6 space-y-4 text-gray-300">
            <p>Email: lawrenceomoit66@gmail.com</p>
            <p>Phone: +256790206354 / +256794162036</p>
            <p>WhatsApp: +256790206354</p>
            <p>Location: Nsambya, Kampala, Uganda</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
