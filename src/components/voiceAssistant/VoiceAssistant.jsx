"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsSoundwave } from "react-icons/bs";
import { SiMercedes } from "react-icons/si";

const VoiceAssistant = () => {
  const router = useRouter();
  const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carModels, setCarModels] = useState([]); // State to store car models data
  let silenceTimer = null;

  useEffect(() => {
    // Function to fetch car models data from the API
    const fetchCarModels = async () => {
      try {
        const response = await fetch("api/carmodels");
        const data = await response.json();
        setCarModels(data.carListing);
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };

    fetchCarModels(); // Fetch car models data when component mounts
  }, []);

  useEffect(() => {
    let recognition = null;

    if (listening) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setLoading(true); // Start loading animation
        silenceTimer = setTimeout(() => {
          recognition.stop();
          setListening(false);
        }, 3000); // Stop listening after 3 seconds of inactivity
      };

      recognition.onresult = (event) => {
        clearTimeout(silenceTimer); // Reset the timer on voice activity
        setLoading(false); // Stop loading animation
    
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim().replace(/\s/g, ''); // Remove spaces from voice input
    
        setVoiceInput(command); // Update state with voice input
    
        // Split voice input into individual words
        const words = command.split(' ');
        console.log(words)
    
        // Remove spaces from listing titles and models before comparison
        const selectedListing = carModels.find(listing => {
            const listingTitle = listing.listingTitle.toLowerCase().replace(/\s/g, '');
            const model = listing.model.toLowerCase().replace(/\s/g, '');
    
            // Check if any word from voice input matches listing title or model
            return words.some(word => listingTitle.includes(word) || model.includes(word));
        });
    
        if (selectedListing) {
            router.push(`/listing/${selectedListing._id}`);
        }
    };
    

      recognition.onerror = (event) => {
        clearTimeout(silenceTimer);
        setLoading(false);
        setListening(false);
        console.error("Voice recognition error:", event.error);
      };

      recognition.start();

      return () => {
        clearTimeout(silenceTimer); // Clear the timer on component unmount
        recognition.stop();
      };
    }
  }, [router, listening, carModels]);

  const toggleListening = () => {
    setListening((prevState) => !prevState);
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center ${
        listening ? "shadow-md" : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <SiMercedes className="text-white h-6 w-6 animate-spin" />
          <span className="mx-2">Listening...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <BsSoundwave className="text-white h-6 w-6" />
          <span className="mx-2">Voice</span>
        </div>
      )}
    </button>
  );
};

export default VoiceAssistant;
