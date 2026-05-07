import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ZavunoPlatform() {
  const [activeSection, setActiveSection] = useState("home");
  const [farmerEmail, setFarmerEmail] = useState("");
  const [farmerPassword, setFarmerPassword] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPassword, setBuyerPassword] = useState("");
  const [transporterPassword, setTransporterPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] =
    useState("MTN Mobile Money");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
  const [produceName, setProduceName] = useState("");
  const [produceQuantity, setProduceQuantity] = useState("");
  const [producePrice, setProducePrice] = useState("");
  const [produceDescription, setProduceDescription] = useState("");
  const [produceImage, setProduceImage] = useState("");
  const [produceListings, setProduceListings] = useState([]);

  // New states for additional features
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailRecipient, setEmailRecipient] = useState("");
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [smsQueue, setSmsQueue] = useState([]);
  const smsBackendUrl =
    import.meta.env.VITE_SMS_BACKEND_URL || "http://localhost:4000";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Function to send queued SMS through the backend
  const sendQueuedSMS = async (queue) => {
    const remaining = [];

    for (const sms of queue) {
      try {
        const response = await fetch(`${smsBackendUrl}/send-sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: sms.phone,
            body: sms.message,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Queued SMS failed");
        }

        console.log(`Queued SMS sent to ${sms.phone}`);
      } catch (error) {
        console.error("Failed to send queued SMS:", error);
        remaining.push(sms);
      }
    }

    if (remaining.length > 0) {
      setSmsQueue(remaining);
      localStorage.setItem("smsQueue", JSON.stringify(remaining));
    } else {
      setSmsQueue([]);
      localStorage.removeItem("smsQueue");
    }
  };

  // New functions for additional features
  const handleSendEmail = async () => {
    if (
      !emailRecipient.trim() ||
      !emailSubject.trim() ||
      !emailMessage.trim()
    ) {
      alert("Please fill in recipient, subject and message");
      return;
    }

    setEmailLoading(true);
    try {
      const templateParams = {
        to_email: emailRecipient,
        subject: emailSubject,
        message: emailMessage,
        from_name: "Zavuno Platform",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
      );

      alert("Email sent successfully!");
      setEmailRecipient("");
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSendSMS = async () => {
    if (!smsPhone.trim() || !smsMessage.trim()) {
      alert("Please fill in both phone number and message");
      return;
    }

    const smsData = {
      phone: smsPhone,
      message: smsMessage,
      timestamp: new Date().toISOString(),
    };

    if (!navigator.onLine) {
      // Queue SMS for when online
      const updatedQueue = [...smsQueue, smsData];
      setSmsQueue(updatedQueue);
      localStorage.setItem("smsQueue", JSON.stringify(updatedQueue));
      alert("SMS queued for sending when online!");
      setSmsPhone("");
      setSmsMessage("");
      return;
    }

    setSmsLoading(true);
    try {
      const response = await fetch(`${smsBackendUrl}/send-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: smsPhone,
          body: smsMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "SMS sending failed");
      }

      alert("SMS sent successfully!");
      setSmsPhone("");
      setSmsMessage("");
    } catch (error) {
      console.error("SMS sending failed:", error);
      const updatedQueue = [...smsQueue, smsData];
      setSmsQueue(updatedQueue);
      localStorage.setItem("smsQueue", JSON.stringify(updatedQueue));
      alert("SMS queued for retry. Will send when connection is restored.");
      setSmsPhone("");
      setSmsMessage("");
    } finally {
      setSmsLoading(false);
    }
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: chatInput,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");

    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Thank you for your message! Our team will respond soon.",
        sender: "Support",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, response]);
    }, 1000);
  };

  useEffect(() => {
    // Generate QR code for the website
    const websiteUrl = window.location.href;
    setQrCodeUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(websiteUrl)}`,
    );

    // Initialize EmailJS
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    // Load queued SMS from localStorage
    const savedQueue = localStorage.getItem("smsQueue");
    if (savedQueue) {
      setSmsQueue(JSON.parse(savedQueue));
    }

    // Set up online/offline event listeners
    const handleOnline = () => {
      // Send queued SMS when coming back online
      const savedQueue = localStorage.getItem("smsQueue");
      if (savedQueue) {
        const queue = JSON.parse(savedQueue);
        if (queue.length > 0) {
          sendQueuedSMS(queue);
        }
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="gradient-bg text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">Z</span>
              </div>
              <div>
                <h1 className="zavuno-brand">ZAVUNO</h1>
                <p className="zavuno-tagline">
                  🌾 Empowering Farmers, Changing Lives.
                </p>
              </div>
            </div>
            <nav className="hidden md:grid grid-cols-2 xl:grid-cols-5 gap-3">
              <button
                onClick={() => setActiveSection("home")}
                className={`nav-btn nav-card ${
                  activeSection === "home"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => setActiveSection("signin")}
                className={`nav-btn nav-card ${
                  activeSection === "signin"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                🔐 Sign In
              </button>
              <button
                onClick={() => setActiveSection("marketplace")}
                className={`nav-btn nav-card ${
                  activeSection === "marketplace"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                🛒 Marketplace
              </button>
              <button
                onClick={() => setActiveSection("weather")}
                className={`nav-btn nav-card ${
                  activeSection === "weather"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                ☀️ Weather
              </button>
              <button
                onClick={() => setActiveSection("ai")}
                className={`nav-btn nav-card ${
                  activeSection === "ai" ? "nav-btn-active" : "nav-btn-inactive"
                }`}
              >
                🤖 AI
              </button>
              <button
                onClick={() => setActiveSection("payments")}
                className={`nav-btn nav-card ${
                  activeSection === "payments"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                💳 Payments
              </button>
              <button
                onClick={() => setActiveSection("email")}
                className={`nav-btn nav-card ${
                  activeSection === "email"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                ✉️ Email
              </button>
              <button
                onClick={() => setActiveSection("sms")}
                className={`nav-btn nav-card ${
                  activeSection === "sms"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                💬 SMS
              </button>
              <button
                onClick={() => setActiveSection("chat")}
                className={`nav-btn nav-card ${
                  activeSection === "chat"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                💭 Chat
              </button>
              <button
                onClick={() => setActiveSection("qrcode")}
                className={`nav-btn nav-card ${
                  activeSection === "qrcode"
                    ? "nav-btn-active"
                    : "nav-btn-inactive"
                }`}
              >
                📱 QR
              </button>
            </nav>
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden relative">
              <div
                className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <button
                  onClick={() => {
                    setActiveSection("home");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => {
                    setActiveSection("signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  🔐 Sign In
                </button>
                <button
                  onClick={() => {
                    setActiveSection("marketplace");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  🛒 Marketplace
                </button>
                <button
                  onClick={() => {
                    setActiveSection("weather");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  ☀️ Weather
                </button>
                <button
                  onClick={() => {
                    setActiveSection("ai");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  🤖 AI Advice
                </button>
                <button
                  onClick={() => {
                    setActiveSection("payments");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  💳 Payments
                </button>
                <button
                  onClick={() => {
                    setActiveSection("email");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  ✉️ Email
                </button>
                <button
                  onClick={() => {
                    setActiveSection("sms");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  💬 SMS
                </button>
                <button
                  onClick={() => {
                    setActiveSection("chat");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  💭 Chat
                </button>
                <button
                  onClick={() => {
                    setActiveSection("qrcode");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item"
                >
                  📱 QR
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Home Section */}
      {activeSection === "home" && (
        <section
          className="relative bg-cover bg-center h-[90vh] flex items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative max-w-7xl mx-auto px-6 text-white">
            <h1 className="zavuno-hero leading-tight max-w-4xl">
              🌾 Africa's Trusted Agricultural Marketplace
            </h1>

            <p className="mt-6 text-xl max-w-2xl text-cyan-50 leading-8 font-semibold">
              ✨ Zavuno was born from the heart of the farm, built for the
              farmer who has been cheated by middlemen, squeezed by unfair price
              rules, and intimidated by officials.
            </p>
            <p className="mt-4 text-lg max-w-2xl text-amber-200 leading-7 font-medium italic">
              "We created Zavuno so every farmer can sell directly, keep the
              value of their harvest, and trust a transparent price update
              system that works for them — not against them."
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="text-block p-6 bg-white/90 border border-white/60 shadow-xl rounded-3xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Why Zavuno Matters
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Too many farmers lose the wealth of their harvest to middlemen
                  who take the best margin, and to enforcement officers who make
                  the market feel unsafe. Zavuno is a safe, trusted home where
                  you keep more of what you earn.
                </p>
              </div>

              <div className="text-block p-6 bg-white/90 border border-white/60 shadow-xl rounded-3xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Automated Price Updates
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every produce category receives live price updates so you can
                  make confident selling decisions. No more guessing, no more
                  unfair offers — just real-time market clarity for every crop.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => setActiveSection("signin")}
                className="btn-primary text-lg"
              >
                🚀 Join Zavuno Today
              </button>
              <button
                onClick={() => setActiveSection("marketplace")}
                className="bg-white/95 text-teal-700 hover:bg-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg"
              >
                🛍️ See Live Prices
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Sign In Section */}
      {activeSection === "signin" && (
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-center text-4xl md:text-5xl">
              🔐 Sign Into ZAVUNO
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-14">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 shadow-xl border-2 border-teal-200 hover:shadow-2xl transition">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                    alt="Farmer portrait"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent text-center">
                  👨‍🌾 Farmer
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
                  className="w-full mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:from-teal-700 hover:to-cyan-700 transition shadow-lg"
                >
                  🌾 Sign In as Farmer
                </button>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                    alt="Buyer shopping"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-200"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-center">
                  🛍️ Buyer
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
                  className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transition shadow-lg"
                >
                  💳 Sign In as Buyer
                </button>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-xl border-2 border-rose-200 hover:shadow-2xl transition">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"
                    alt="Delivery truck"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-rose-200"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent text-center">
                  🚚 Transporter
                </h3>

                <input
                  type="email"
                  placeholder="Transporter Email"
                  value={transporterEmail}
                  onChange={(e) => setTransporterEmail(e.target.value)}
                  className="w-full mt-6 p-4 rounded-xl border border-rose-200"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={transporterPassword}
                  onChange={(e) => setTransporterPassword(e.target.value)}
                  className="w-full mt-4 p-4 rounded-xl border border-rose-200"
                />

                <button
                  onClick={handleTransporterSignIn}
                  className="w-full mt-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-rose-700 hover:to-pink-700 transition shadow-lg"
                >
                  🚚 Sign In as Transporter
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Marketplace Section */}
      {activeSection === "marketplace" && (
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-center text-4xl md:text-5xl mb-4">
              🥬 ZAVUNO Marketplace - Sell Your Produce
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg font-semibold">
              ✨ Upload your fresh produce and connect directly with buyers
              across Africa
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-green-200 hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
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
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop"
                    alt="Fresh produce market"
                    className="w-32 h-32 rounded-2xl mx-auto mb-4 object-cover border-4 border-orange-200 shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">
                  💡 Why Sell on Zavuno?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start p-4 bg-white/50 rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=200&auto=format&fit=crop"
                      alt="Direct connection"
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                    <div>
                      <span className="text-2xl mr-2 accent-icon">✓</span>
                      <span className="font-semibold text-orange-800">
                        Direct Buyer Access:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        Connect with serious buyers without middlemen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white/50 rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=200&auto=format&fit=crop"
                      alt="Fair pricing"
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                    <div>
                      <span className="text-2xl mr-2 accent-icon">✓</span>
                      <span className="font-semibold text-orange-800">
                        Fair Prices:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        You control the price of your produce
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white/50 rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop"
                      alt="Instant reach"
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                    <div>
                      <span className="text-2xl mr-2 accent-icon">✓</span>
                      <span className="font-semibold text-orange-800">
                        Instant Reach:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        Farmers, businesses, and restaurants find your products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white/50 rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&auto=format&fit=crop"
                      alt="Safe payments"
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                    <div>
                      <span className="text-2xl mr-2 accent-icon">✓</span>
                      <span className="font-semibold text-orange-800">
                        Safe Payments:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        Mobile money payments with protection
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white/50 rounded-xl md:col-span-2">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop"
                      alt="Transportation"
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                    <div>
                      <span className="text-2xl mr-2 accent-icon">✓</span>
                      <span className="font-semibold text-orange-800">
                        Transportation:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        Easy access to trusted transporters
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                🌱 Zavuno Support Ecosystem for Farmers
              </h3>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    🔗 Market Linkage & Platform Access
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Zavuno links you to trusted marketplaces, buyers,
                    transporters, agro-input platforms, and organized buyer
                    networks so you can sell without losing value to middlemen.
                  </p>
                  <p className="text-sm text-gray-600">
                    Access national and regional trade channels, export buyers,
                    wholesale hubs, and price-verified market platforms from one
                    place.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    💰 Agro Loans & Support Organizations
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Find links to agricultural credit programs, harvest loans,
                    crop insurance, and organizations that support agri-business
                    growth.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno helps you connect with farmer-friendly finance,
                    cooperative groups, local extension services, and NGOs that
                    back smallholder farmers.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    🌾 Government Programs & Agricultural Agencies
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use Zavuno to discover government programs designed to help
                    farmers access training, subsidies, equipment, and market
                    support.
                  </p>
                  <p className="text-sm text-gray-600">
                    Connect with agricultural ministry programs, rural
                    development initiatives, and public sector farmer support
                    networks.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    🐝 Beekeeping, Poultry, Pigery & Rabbit Keeping
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Diversify your farm income with beekeeping, poultry, pig
                    farming, or rabbit keeping. These farm enterprises can bring
                    extra cash, improve resilience, and make the farm more
                    sustainable.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno encourages farmers to adopt high-value livestock and
                    apiary practices that fit smallholder plots and local
                    demand.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    🧪 Agrochemicals & Seed Company Partnerships
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Use verified agrochemical suppliers and seed companies that
                    deliver trusted inputs, improved seeds, and safer crop
                    protection.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno provides connections to companies that support
                    healthy crops and reliable seed varieties for better
                    harvests.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    ⚙️ Modern Farm Technology Companies
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Discover companies offering modern agricultural tools at
                    friendly terms — solar irrigation kits, precision planters,
                    mobile farm management systems, and sensor-driven crop care.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno helps farmers access affordable technology partners
                    so they can grow smarter, reduce waste, and increase
                    profits.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    🩺 Crop & Animal Disease Alerts
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Receive automated disease updates for both crops and
                    livestock so you can act quickly to protect your farm.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno keeps you informed about pest outbreaks, animal
                    health warnings, and treatment guidance for healthier farms.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    💼 Smart Finance Advice for Farmers
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Manage your farm income carefully: save a portion of each
                    sale, budget for inputs, track production costs, and avoid
                    debt traps.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zavuno helps farmers treat their farm as a business, plan
                    for harvest cycles, and build financial resilience for every
                    season.
                  </p>
                </div>

                <div className="text-block p-8 bg-white/95 border border-slate-200 rounded-3xl shadow-xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    👥 Farmer Group Chat & Community Chart
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Join the Zavuno community and communicate with fellow
                    farmers, share market insights, compare prices, and
                    coordinate support.
                  </p>
                  <p className="text-sm text-gray-600">
                    Use the group communication feature to remain connected and
                    learn from others across the region.
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
      )}

      {/* Farmers in Action Section - Part of Home */}
      {activeSection === "home" && (
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-center text-4xl md:text-5xl mb-4">
              🌾 Champions of the Soil - Our Farmers
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg font-semibold">
              ✨ Meet the heroes who feed our nation. Their faith in the land
              and hope for tomorrow inspire us all to dream bigger and work
              harder.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-105 border-2 border-green-200">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop"
                  alt="Farmer in garden with crops"
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                    ✨ Guardians of Growth
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our farmers are the guardians of growth, blending ancient
                    wisdom with modern innovation. With unwavering faith, they
                    nurture each seed, believing in the promise of abundant
                    harvest. Their dedication today ensures a prosperous
                    tomorrow for all.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-105 border-2 border-emerald-200">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-8c63cc00022b?q=80&w=800&auto=format&fit=crop"
                  alt="Farmers selling produce at market"
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    💼 Marketplace Victories
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    In our marketplace, faith meets opportunity. Farmers proudly
                    showcase their harvest, connecting directly with buyers who
                    value their hard work. Each successful sale is a testament
                    to their perseverance and a step toward the brighter future
                    they envision.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-3xl p-8 shadow-xl border-2 border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  🌟 Your Faith is Our Inspiration
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  To every farmer reading this: your work is sacred. Your faith
                  in the soil, your hope for better days, your dedication to
                  feeding your community - these are the qualities that make you
                  true champions. Keep believing, keep planting, keep dreaming.
                  Your harvest of blessings is coming.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Payments Section */}
      {activeSection === "payments" && (
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
      )}

      {/* Farmer Motivation Section */}
      {activeSection === "home" && (
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-center text-4xl md:text-5xl mb-4">
              🌟 Hope & Faith for Farmers
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg font-semibold">
              ✨ Every seed you plant carries the promise of tomorrow. Your
              dedication today builds a brighter future for your family and
              community.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition transform hover:scale-105">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400&auto=format&fit=crop"
                    alt="Seeds being planted"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-200"
                  />
                </div>
                <div className="text-6xl mb-4 text-center">🌱</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 text-center">
                  Believe in Your Seeds
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every great harvest begins with faith in a single seed. Your
                  hard work, patience, and trust in nature's timing will yield
                  abundant blessings. Remember, even in drought, your faith
                  keeps hope alive.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-teal-200 hover:shadow-2xl transition transform hover:scale-105">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop"
                    alt="Beautiful sunrise over fields"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
                  />
                </div>
                <div className="text-6xl mb-4 text-center">🌅</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4 text-center">
                  Dawn Brings New Hope
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Each morning brings fresh opportunities. Your dedication to
                  the land, your commitment to quality, and your vision for a
                  better future inspire us all. Keep believing - your
                  breakthrough harvest is coming.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-200 hover:shadow-2xl transition transform hover:scale-105">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop"
                    alt="Golden wheat harvest"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
                  />
                </div>
                <div className="text-6xl mb-4 text-center">🌾</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 text-center">
                  Harvest Your Dreams
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Your dreams of prosperity are as real as the crops you
                  nurture. With faith, perseverance, and the support of your
                  community, you will reap the rewards of your labor. A
                  bountiful future awaits the faithful farmer.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 rounded-3xl p-10 shadow-xl border-2 border-amber-200">
              <div className="text-center">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent mb-6">
                  💪 Your Faith Will Be Rewarded
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                  Dear Farmer, your hands that toil in the soil are shaping
                  Africa's future. Every challenge you overcome, every crop you
                  nurture, every life you feed - these are acts of faith that
                  will yield eternal rewards. Keep believing, keep working, keep
                  hoping. Your harvest of blessings is on the way.
                </p>
                <div className="flex justify-center items-center gap-4 text-4xl">
                  <span>🙏</span>
                  <span>🌱</span>
                  <span>🌟</span>
                  <span>🌾</span>
                  <span>✨</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Weather Section */}
      {activeSection === "weather" && (
        <section className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <img
                src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=400&auto=format&fit=crop"
                alt="Weather forecasting"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200 shadow-lg"
              />
              <h2 className="section-title text-center text-4xl md:text-5xl mb-4">
                ☀️ Weather Intelligence for Farmers
              </h2>
              <p className="text-center text-gray-700 text-lg font-semibold">
                ✨ Plan your farming activities with accurate weather forecasts
                and smart recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-block">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=400&auto=format&fit=crop"
                    alt="Weather map"
                    className="w-24 h-24 rounded-xl mx-auto mb-4 object-cover border-4 border-blue-200"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 text-center">
                  🌤️ Get Weather Forecast
                </h3>
                <input
                  type="text"
                  placeholder="Enter your location (e.g., Kampala, Jinja)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-blue-300 mb-4"
                />
                <button
                  onClick={handleGetWeather}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                >
                  🌦️ Get Weather Update
                </button>
              </div>

              {weatherData && (
                <div className="text-block">
                  <div className="text-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=400&auto=format&fit=crop"
                      alt="Weather data visualization"
                      className="w-24 h-24 rounded-xl mx-auto mb-4 object-cover border-4 border-green-200"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 text-center">
                    📍 {weatherData.location} Weather Report
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">🌡️</div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-xl font-bold text-blue-700">
                        {weatherData.temperature}°C
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">☁️</div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <p className="text-xl font-bold text-yellow-700">
                        {weatherData.condition}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">💧</div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="text-xl font-bold text-green-700">
                        {weatherData.humidity}%
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">🌧️</div>
                      <p className="text-sm text-gray-600">Rainfall</p>
                      <p className="text-xl font-bold text-purple-700">
                        {weatherData.rainfall}mm
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* AI Advice Section */}
      {activeSection === "ai" && (
        <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop"
                alt="AI agricultural technology"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-orange-200 shadow-lg"
              />
              <h2 className="section-title text-center text-4xl md:text-5xl mb-4">
                🤖 AI Agricultural Intelligence
              </h2>
              <p className="text-center text-gray-700 text-lg font-semibold">
                ✨ Get expert AI-powered recommendations for your crops and
                farming practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-block">
                <div className="text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop"
                    alt="Smart farming technology"
                    className="w-24 h-24 rounded-xl mx-auto mb-4 object-cover border-4 border-orange-200"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 text-center">
                  🌱 Ask the AI Expert
                </h3>
                <textarea
                  placeholder="Ask your agricultural question... e.g., 'How do I grow maize?' or 'Best practices for tomatoes?'"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-orange-300 h-32 resize-none mb-4"
                />
                <button
                  onClick={handleGetAiAdvice}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition shadow-lg"
                >
                  🚀 Get AI Advice
                </button>
              </div>

              {aiAdvice && (
                <div className="text-block">
                  <div className="text-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop"
                      alt="Data analysis and insights"
                      className="w-24 h-24 rounded-xl mx-auto mb-4 object-cover border-4 border-green-200"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 text-center">
                    💡 Expert Recommendation
                  </h3>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <p className="text-lg leading-relaxed text-gray-800">
                      {aiAdvice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Email Section */}
      {activeSection === "email" && (
        <section className="py-20 bg-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-4">
              📧 Email Messaging
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Send emails to farmers, buyers, and partners
            </p>

            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-lg">
              <input
                type="email"
                placeholder="Recipient Email"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-purple-300 mb-4"
              />

              <input
                type="text"
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-purple-300 mb-4"
              />

              <textarea
                placeholder="Message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows="6"
                className="w-full p-4 rounded-xl border-2 border-purple-300 mb-6"
              />

              <button
                onClick={handleSendEmail}
                disabled={emailLoading}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {emailLoading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SMS Section */}
      {activeSection === "sms" && (
        <section className="py-20 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-indigo-800 mb-4">
              📱 SMS Messaging
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Send SMS notifications for offline integration
            </p>

            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-lg">
              {smsQueue.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Queued SMS ({smsQueue.length})
                  </h4>
                  <p className="text-sm text-yellow-700">
                    These messages will be sent when you're back online.
                  </p>
                </div>
              )}

              <input
                type="tel"
                placeholder="Phone Number (e.g., +256790206354)"
                value={smsPhone}
                onChange={(e) => setSmsPhone(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-indigo-300 mb-4"
              />

              <textarea
                placeholder="SMS Message (max 160 characters)"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                rows="4"
                maxLength="160"
                className="w-full p-4 rounded-xl border-2 border-indigo-300 mb-6"
              />

              <button
                onClick={handleSendSMS}
                disabled={smsLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {smsLoading ? "Sending..." : "Send SMS"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Chat Section */}
      {activeSection === "chat" && (
        <section className="py-20 bg-pink-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-800 mb-4">
              💬 User Chat
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Communicate with other users in real-time
            </p>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg">
              <div className="h-96 overflow-y-auto border-2 border-pink-300 rounded-xl p-4 mb-4 bg-gray-50">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${msg.sender === "You" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${msg.sender === "You" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      <p className="font-semibold">{msg.sender}</p>
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-75">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendChatMessage()
                  }
                  className="flex-1 p-4 rounded-xl border-2 border-pink-300"
                />
                <button
                  onClick={handleSendChatMessage}
                  className="bg-pink-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-pink-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QR Code Section */}
      {activeSection === "qrcode" && (
        <section className="py-20 bg-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-teal-800 mb-4">
              📱 QR Code Access
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Scan this QR code to easily access the Zavuno platform
            </p>

            <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-lg text-center">
              <img
                src={qrCodeUrl}
                alt="QR Code for Zavuno Platform"
                className="mx-auto mb-6 border-4 border-teal-300 rounded-lg"
              />
              <p className="text-gray-600 mb-4">
                Scan with your phone's camera
              </p>
              <p className="text-sm text-gray-500">
                URL: {window.location.href}
              </p>
            </div>
          </div>
        </section>
      )}

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
