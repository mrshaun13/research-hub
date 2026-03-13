const glossaryTerms = {
  "cardioid": {
    definition: "A heart-shaped polar pickup pattern that captures sound primarily from the front of the microphone and rejects sound from the sides and rear. The standard pattern for solo voice recording and calls.",
    researchPrompt: "What is a cardioid microphone polar pattern and why is it preferred for voice recording?"
  },
  "condenser": {
    definition: "A microphone type that uses a capacitor (condenser) to convert sound into electrical signal. Highly sensitive and detailed, but picks up more ambient room noise than dynamic microphones. Requires phantom power or USB bus power.",
    researchPrompt: "What is a condenser microphone and when should you use one versus a dynamic microphone?"
  },
  "dynamic": {
    definition: "A microphone type that uses electromagnetic induction (a moving coil in a magnetic field) to convert sound. Less sensitive than condensers, which means it naturally rejects background noise — ideal for untreated rooms and live use.",
    researchPrompt: "What is a dynamic microphone and why do broadcasters prefer it for voice?"
  },
  "DSP": {
    definition: "Digital Signal Processing — software or hardware algorithms that process audio in real time. In USB microphones, DSP handles noise reduction, auto-level adjustment, equalization, and de-essing without needing a separate app or audio interface.",
    researchPrompt: "What is DSP in microphones and how does onboard digital signal processing improve audio quality?"
  },
  "XLR": {
    definition: "A professional 3-pin balanced audio connector used in studio and stage equipment. XLR microphones require an audio interface or mixer to connect to a computer, but offer lower noise and greater flexibility than USB alone.",
    researchPrompt: "What is an XLR microphone connection and do I need one for home recording?"
  },
  "APHEX": {
    definition: "A brand of professional audio processing — specifically, APHEX processors include Aural Exciter (harmonic enhancement) and Big Bottom (bass enhancement). Rode licenses APHEX DSP for the PodMic USB to deliver polished broadcast-quality voice processing built into the mic.",
    researchPrompt: "What is APHEX audio processing and why is it used in broadcast microphones?"
  },
  "polar pattern": {
    definition: "A diagram showing the directional sensitivity of a microphone — which directions it picks up sound and which it rejects. Common patterns include cardioid (front), omnidirectional (all directions), and bidirectional (front and back).",
    researchPrompt: "What are microphone polar patterns and how do they affect recording quality in different environments?"
  },
  "MAP": {
    definition: "Minimum Advertised Price — a pricing policy set by manufacturers that prohibits retailers from advertising the product below a set price. This is why some mics (like Shure) show 'see price in cart' on Amazon — the actual price may be lower once added to cart.",
    researchPrompt: "What is MAP pricing and how does it affect the prices you see online for audio equipment?"
  }
};

export default glossaryTerms;
