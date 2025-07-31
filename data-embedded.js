// Embedded Data Fallback - Auto-generated from data.json
// Last updated: 2025-07-31
// This file provides complete fallback data when external data.json cannot be loaded

window.EMBEDDED_SITE_DATA = {
  "site": {
    "title": "Johnny Hockin",
    "description": "Inventor, filmmaker, coder, explorer",
    "url": "https://johnnyhockin.com"
  },
  "explorerLog": [
    {
      "id": "log-001",
      "date": "2025.07.31",
      "content": "Building this new website, based on a personal site design I created in 1999, although at that time there was no need to make a site responsive."
    },
    {
      "id": "log-002",
      "date": "2024.01.25",
      "content": "Deep dive into WebGL shaders for a new visualization project. The math is brutal but the results are worth it. Managed to get real-time particle systems running at 60fps with 10,000 particles. The key was batching draw calls and using instanced rendering. GPU programming feels like magic when it works."
    },
    {
      "id": "log-003",
      "date": "2024.01.22",
      "content": "Spent the weekend building a custom MIDI controller from salvaged arcade buttons. The tactile feedback is incredible—way better than any commercial controller I've used. Each button has individual RGB LEDs that respond to velocity. Total cost: $45. Sometimes the best tools are the ones you build yourself."
    },
    {
      "id": "log-004",
      "date": "2024.01.19",
      "content": "Breakthrough on the gesture recognition project. Switched from OpenCV to MediaPipe and the performance improvement is dramatic. Latency dropped from 150ms to 45ms. The hand tracking is now responsive enough for real-time musical performance. Next step: mapping gestures to synthesizer parameters."
    },
    {
      "id": "log-005",
      "date": "2024.01.15",
      "content": "Started building a custom mechanical keyboard. The switches arrived today—tactile, 67g actuation. The PCB design is proving more complex than expected. Need to account for the USB-C connector placement and the stabilizer mounting points. Learning KiCad properly this time instead of hacking through it."
    },
    {
      "id": "log-006",
      "date": "2024.01.12",
      "content": "Experimenting with computer vision for detecting hand gestures. OpenCV is overkill for what I need, but the precision is incredible. Managed to get reliable detection at 30fps on the Pi 4. Next: reducing the model size. The real challenge is filtering out false positives when the lighting changes."
    },
    {
      "id": "log-007",
      "date": "2024.01.08",
      "content": "Built a small app to track my daily coding sessions. No fancy frameworks—just vanilla JS and local storage. Sometimes the simplest tools are the most reliable. Total build time: 3 hours. Added a simple pomodoro timer and session analytics. The data is revealing some interesting patterns about my productivity cycles."
    },
    {
      "id": "log-008",
      "date": "2024.01.05",
      "content": "Found an interesting bug in my LED matrix controller. The issue wasn't in the code—it was in my understanding of the hardware timing requirements. PWM frequency was interfering with the refresh rate. Fixed by adjusting the timer prescaler. This kind of debugging is why I love embedded systems—when it works, you know exactly why."
    },
    {
      "id": "log-009",
      "date": "2024.01.02",
      "content": "New year, new experiments. Planning to document everything more thoroughly this time. Raw process notes, not polished blog posts. The goal is authentic documentation of the making process. Started a physical notebook alongside this digital log—there's something about pen and paper for initial sketches that screens can't replicate."
    },
    {
      "id": "log-010",
      "date": "2023.12.28",
      "content": "Finished the first prototype of the gesture-controlled drawing tablet. The latency is still too high for real-time drawing, but the concept works. Using MediaPipe for hand tracking. The breakthrough was realizing I needed to predict gesture completion rather than just detect current state. Machine learning for motion prediction is surprisingly accessible now."
    },
    {
      "id": "log-011",
      "date": "2023.12.25",
      "content": "Christmas hack session: Built a wireless sensor network using ESP32s to monitor temperature and humidity throughout the house. The mesh networking is surprisingly robust. Each node costs about $8 and runs for months on a battery. Data visualization through a simple web interface. Sometimes the best gifts are the ones that solve real problems."
    },
    {
      "id": "log-012",
      "date": "2023.12.20",
      "content": "Discovered that the Arduino IDE has a secret terminal emulator buried in the tools menu. How did I not know this for three years? This changes everything for debugging embedded projects. Also found that you can script the IDE with external tools. The documentation is terrible but the functionality is powerful."
    },
    {
      "id": "log-013",
      "date": "2023.12.15",
      "content": "Built a simple oscilloscope using an ESP32 and a small OLED display. Not accurate enough for serious work, but perfect for understanding signal basics. Cost: $12. The sample rate is limited by the display refresh, but for audio frequency analysis it's surprisingly useful. Added FFT visualization for spectrum analysis."
    },
    {
      "id": "log-014",
      "date": "2023.12.10",
      "content": "Prototyping a modular synthesizer using 3D printed parts and analog circuits. The filter design is based on the Moog ladder filter but simplified for easier construction. Hand-wound inductors using salvaged transformer cores. The sound has that raw, unpredictable quality that digital synths struggle to replicate."
    },
    {
      "id": "log-015",
      "date": "2023.12.05",
      "content": "Started working on a Bluetooth mesh network for home automation. The ESP32 mesh capabilities are impressive but poorly documented. Spent most of the day reading source code to understand the API. Once you get past the learning curve, the possibilities are endless. Planning to use this for distributed sensor monitoring."
    },
    {
      "id": "log-016",
      "date": "2023.11.28",
      "content": "Film project update: Finished editing the documentary about local makers. The story came together better than expected. Used DaVinci Resolve for color grading—the learning curve is steep but the results are professional quality. The film has been accepted to three local festivals. Sometimes the best stories are hiding in plain sight."
    },
    {
      "id": "log-017",
      "date": "2023.11.22",
      "content": "Deep learning experiment: Training a neural network to recognize hand-drawn circuit diagrams and convert them to proper schematics. The initial results are promising but the dataset is small. Need to generate more training data. This could be incredibly useful for rapid prototyping—sketch an idea and get a working schematic instantly."
    },
    {
      "id": "log-018",
      "date": "2023.11.18",
      "content": "Built a custom PCB business card with an embedded microcontroller and LEDs. The gerber files are works of art in themselves. Each card costs about $3 to manufacture but makes an unforgettable impression. Added a simple contact exchange feature—cards can communicate via IR when brought close together. Technology as conversation starter."
    }
  ],
  "projects": [
    {
      "id": "mechanical-keyboard",
      "title": "Custom Mechanical Keyboard",
      "description": "Building a 60% keyboard from scratch. PCB design, firmware, and case machining.",
      "image": "Photos that can be used/prt_275x115_1495567625_2x.png",
      "fullDescription": "A completely custom 60% mechanical keyboard built from the ground up. This project involves PCB design in KiCad, custom firmware development, and precision case machining. The goal is to create a keyboard that matches my exact typing preferences while learning about hardware design. The keyboard features hot-swappable switches, per-key RGB lighting, and a custom layout optimized for programming workflows. The case is CNC machined from a single block of aluminum with a subtle sandblasted finish.",
      "category": "Hardware",
      "date": "2024.01.28",
      "status": "In Progress",
      "featured": true,
      "process": "Started with extensive switch testing—tried over 20 different switch types before settling on Gateron Brown tactile switches with 67g actuation force. The PCB design in KiCad took three major revisions to get right. The most challenging aspect was routing the traces while maintaining proper spacing for the USB-C connector and ensuring electromagnetic compatibility. The firmware is based on QMK but heavily customized with macros for common programming patterns. Currently in the assembly phase—the PCBs arrived from JLCPCB with excellent quality. The case machining is being done on a friend's CNC mill using 6061 aluminum stock.",
      "links": [
        {
          "title": "PCB Files (KiCad)",
          "url": "#github-pcb-files"
        },
        {
          "title": "Firmware Repository",
          "url": "#github-firmware"
        },
        {
          "title": "3D Models (Fusion 360)",
          "url": "#fusion360-models"
        }
      ],
      "notes": "The most challenging part was understanding the USB protocol implementation and debugging the key matrix. QMK firmware provides a solid foundation, but customizing the key mappings and implementing advanced features like tap-dance keys required diving deep into the codebase. Learned more about electrical engineering in this project than in any textbook. The satisfaction of typing on hardware you designed yourself is unmatched."
    },
    {
      "id": "gesture-recognition",
      "title": "Hand Gesture Recognition",
      "description": "Computer vision experiment for controlling devices through hand movements.",
      "image": "Photos that can be used/prt_275x139_1495568799_2x.png",
      "fullDescription": "A real-time hand gesture recognition system using computer vision to control devices and applications without physical contact. The system can recognize complex hand gestures and translate them into MIDI commands, mouse movements, or custom application controls. Built with Python and optimized for performance on edge devices like Raspberry Pi. The recognition engine uses a combination of MediaPipe for hand tracking and a custom neural network for gesture classification. Supports training custom gestures through a simple interface.",
      "category": "Software",
      "date": "2024.01.19",
      "status": "Active Development",
      "featured": true,
      "process": "Started with OpenCV but quickly switched to MediaPipe for better performance and accuracy. The breakthrough came when I realized I needed to track gesture sequences over time rather than just static hand positions. Implemented a sliding window approach to capture gesture dynamics. Trained the classifier using TensorFlow Lite with a dataset of 2,000 gesture samples across 12 different gestures. The system now achieves 97% accuracy with sub-50ms latency on Raspberry Pi 4. Added MIDI output capabilities to control synthesizers and DAWs in real-time.",
      "links": [
        {
          "title": "Python Source Code",
          "url": "#github-gesture-recognition"
        },
        {
          "title": "Training Dataset",
          "url": "#gesture-dataset"
        },
        {
          "title": "Demo Video",
          "url": "#gesture-demo"
        }
      ],
      "notes": "The most interesting discovery was that gesture recognition accuracy improved dramatically when I included temporal information. Hand positions alone aren't enough—the movement patterns contain crucial information. This project opened my eyes to the potential of computer vision for creative applications. Currently exploring integration with Ableton Live for live musical performance."
    },
    {
      "id": "led-matrix",
      "title": "LED Matrix Controller",
      "description": "Real-time graphics on a 32x32 RGB LED matrix. Custom protocols and timing.",
      "image": "Photos that can be used/prt_275x139_1495568799_2x.png",
      "fullDescription": "A high-performance controller for driving 32x32 RGB LED matrices with real-time graphics and animations. Features custom communication protocols and precise timing control.",
      "category": "Hardware",
      "date": "2024.01.05",
      "status": "Completed",
      "featured": true,
      "process": "The main challenge was understanding the timing requirements for the LED matrix protocol. PWM frequency had to be carefully balanced with refresh rate to avoid interference.",
      "links": [
        {
          "title": "Controller Code",
          "url": "#"
        },
        {
          "title": "Hardware Schematics",
          "url": "#"
        }
      ],
      "notes": "This project taught me more about hardware timing than any textbook. The devil is truly in the details when working with real-time systems."
    },
    {
      "id": "coding-tracker",
      "title": "Daily Coding Session Tracker",
      "description": "Minimal app for tracking coding time and productivity patterns.",
      "fullDescription": "A simple yet effective application for tracking daily coding sessions, built with vanilla JavaScript and local storage. No external dependencies, no complex build process—just pure functionality.",
      "category": "Software",
      "date": "2024.01.08",
      "status": "Completed",
      "featured": false,
      "process": "Built in a single 3-hour session using only vanilla JavaScript and browser local storage. The interface is intentionally minimal to avoid distraction from actual coding.",
      "notes": "Sometimes the best tools are the simplest ones. This tracker has been more useful than any complex productivity app I've tried."
    },
    {
      "id": "oscilloscope",
      "title": "DIY ESP32 Oscilloscope",
      "description": "Basic oscilloscope functionality using ESP32 and OLED display.",
      "fullDescription": "A portable oscilloscope built using an ESP32 microcontroller and OLED display. Features include basic waveform display, FFT analysis, signal generation, and data logging. While not suitable for precision measurements, it's perfect for understanding signal basics, audio analysis, and quick debugging of analog circuits.",
      "category": "Hardware",
      "date": "2023.12.15",
      "status": "Completed",
      "featured": false,
      "process": "Used ADC sampling with DMA for data acquisition and custom rendering code for the OLED display. Implemented FFT analysis using ESP32's built-in DSP libraries. Added a simple signal generator using the DAC output. The biggest challenge was optimizing the display refresh rate while maintaining sample accuracy.",
      "notes": "Total cost was $12. Not lab-quality, but incredibly useful for educational purposes and basic signal analysis. This project taught me more about signal processing than any textbook. The ESP32's dual-core architecture allowed me to separate acquisition from display rendering."
    },
    {
      "id": "webgl-visualizer",
      "title": "WebGL Audio Visualizer",
      "description": "Real-time audio visualization using WebGL shaders and Web Audio API.",
      "image": "Photos that can be used/prt_275x148_1495568489_2x.jpg.jpeg",
      "fullDescription": "A high-performance audio visualizer built with WebGL that creates stunning real-time visuals synchronized to music. Features include particle systems, fractals, and procedural textures all running at 60fps. The visualizer analyzes audio frequencies in real-time and maps them to various visual parameters including color, movement, and geometric transformations.",
      "category": "Software",
      "date": "2024.01.25",
      "status": "Completed",
      "featured": true,
      "process": "Started with basic Canvas 2D but quickly hit performance limits. Migrated to WebGL for GPU acceleration. The key breakthrough was using instanced rendering to draw thousands of particles efficiently. Web Audio API provides real-time frequency analysis. Shader programming was intimidating at first but incredibly powerful once mastered.",
      "links": [
        {
          "title": "Live Demo",
          "url": "#webgl-visualizer-demo"
        },
        {
          "title": "Source Code",
          "url": "#github-webgl-visualizer"
        }
      ],
      "notes": "This project pushed my understanding of graphics programming to new levels. The math behind shader programming is complex but the visual results are magical. Managing 10,000+ particles at 60fps required careful optimization of GPU memory and draw calls."
    },
    {
      "id": "midi-controller",
      "title": "Arcade Button MIDI Controller",
      "description": "Custom MIDI controller built from salvaged arcade buttons with velocity-sensitive RGB feedback.",
      "image": "Photos that can be used/prt_275x115_1495567625_2x.png",
      "fullDescription": "A unique MIDI controller built from salvaged arcade buttons, each with individual RGB LEDs that respond to velocity and provide visual feedback. The controller connects via USB and is compatible with all major DAWs. Features include customizable velocity curves, programmable LED patterns, and a robust aluminum enclosure. The tactile response is superior to commercial controllers due to the high-quality arcade switches.",
      "category": "Hardware",
      "date": "2024.01.22",
      "status": "Completed",
      "featured": true,
      "process": "Sourced 16 authentic arcade buttons from a local arcade that was closing down. Each button required custom wiring for both the switch and LED. Used an Arduino Pro Micro for USB MIDI capability. The enclosure is laser-cut acrylic with an aluminum base for stability. Programming the velocity-sensitive LEDs required careful calibration to match musical dynamics.",
      "links": [
        {
          "title": "Build Photos",
          "url": "#midi-controller-build"
        },
        {
          "title": "Arduino Code",
          "url": "#github-midi-controller"
        }
      ],
      "notes": "The tactile feedback of real arcade buttons is incredible—each press has weight and authority that cheap MIDI controllers can't match. Total cost was $45 but the build quality rivals controllers costing 10x more. This reinforced my belief that the best tools are often the ones you build yourself."
    },
    {
      "id": "pcb-business-card",
      "title": "Interactive PCB Business Card",
      "description": "Custom PCB business cards with embedded microcontrollers, LEDs, and IR communication.",
      "fullDescription": "Business cards that are also functional electronic devices. Each card contains an ATtiny85 microcontroller, four LEDs, a battery, and an IR transceiver. Cards can exchange contact information when brought close together, creating a memorable networking experience. The PCB itself serves as the business card, with contact information in the silkscreen layer.",
      "category": "Hardware",
      "date": "2023.11.18",
      "status": "Completed",
      "featured": false,
      "process": "Designed the PCB to meet standard business card dimensions while accommodating all components. The challenge was fitting everything into a 2-layer board with such tight space constraints. Used KiCad for design and JLCPCB for manufacturing. The IR communication protocol is simple but effective—cards broadcast contact info when activated.",
      "links": [
        {
          "title": "PCB Design Files",
          "url": "#github-pcb-card"
        },
        {
          "title": "Assembly Instructions",
          "url": "#pcb-card-assembly"
        }
      ],
      "notes": "Each card costs about $3 to manufacture but makes an unforgettable impression. The gerber files are works of art in themselves—functional circuit board as aesthetic object. Several people have kept them as desk decorations rather than throwing them away like normal business cards."
    },
    {
      "id": "mesh-sensor-network",
      "title": "Wireless Mesh Sensor Network",
      "description": "ESP32-based mesh network for distributed environmental monitoring throughout the house.",
      "fullDescription": "A wireless sensor network using ESP32 modules in a mesh configuration to monitor temperature, humidity, air quality, and motion throughout the house. Each node is battery-powered and can run for months without charging. Data is collected centrally and visualized through a web interface with historical trending and alerts.",
      "category": "Hardware",
      "date": "2023.12.25",
      "status": "Deployed",
      "featured": false,
      "process": "Started with ESP-NOW protocol but migrated to ESP-MESH for better scalability and self-healing capabilities. Each node includes BME280 sensors for environmental data and PIR sensors for motion detection. 3D printed enclosures house the electronics and batteries. The mesh network automatically routes data through the most efficient path to the gateway node.",
      "links": [
        {
          "title": "Node Firmware",
          "url": "#github-mesh-sensors"
        },
        {
          "title": "Web Dashboard",
          "url": "#mesh-dashboard-demo"
        }
      ],
      "notes": "The ESP32 mesh capabilities are impressive once you understand the API. Each node costs about $8 and provides months of battery life. The self-healing mesh topology means the network continues working even if individual nodes fail. Real-world testing revealed interesting patterns about air circulation and temperature gradients in the house."
    },
    {
      "id": "modular-synthesizer",
      "title": "3D Printed Modular Synthesizer",
      "description": "Analog modular synthesizer with 3D printed panels and hand-wound components.",
      "fullDescription": "A modular analog synthesizer built using 3D printed panels and traditional analog circuits. Features include voltage-controlled oscillators, filters based on the Moog ladder design, envelope generators, and sequencers. All panels are 3D printed with a custom mounting system. Transformers and inductors are hand-wound using salvaged cores.",
      "category": "Hardware",
      "date": "2023.12.10",
      "status": "Completed",
      "featured": false,
      "process": "Started with breadboard prototypes of classic analog circuits. The filter design is based on the Moog transistor ladder but simplified for easier construction. 3D printed the Eurorack-compatible panels with integrated mounting posts. Hand-wound inductors using salvaged transformer cores from old CRT monitors. Each module was tested extensively before final assembly.",
      "notes": "The sound has that raw, unpredictable quality that digital synths struggle to replicate. Hand-wound components add unique character—no two modules sound exactly the same. This project deepened my appreciation for analog circuit design and the pioneers who created these sounds in the 1960s."
    },
    {
      "id": "neural-schematic-parser",
      "title": "Neural Network Schematic Parser",
      "description": "Deep learning system to convert hand-drawn circuit diagrams into proper schematics.",
      "fullDescription": "An experimental neural network system that can recognize hand-drawn circuit diagrams and convert them to proper digital schematics. Uses computer vision to identify components and their connections, then generates clean schematic files compatible with KiCad and other EDA tools. Still in early development but showing promising results.",
      "category": "Software",
      "date": "2023.11.22",
      "status": "Research",
      "featured": false,
      "process": "Started by building a dataset of hand-drawn circuits paired with their digital equivalents. Used a combination of object detection for component recognition and graph neural networks to understand connectivity. The biggest challenge is handling the variability in how people draw circuits—there's no standard way to sketch a resistor or capacitor.",
      "notes": "Initial results are promising but the dataset is small. Need to generate more training data to handle edge cases. This could be incredibly useful for rapid prototyping—sketch an idea and get a working schematic instantly. The intersection of computer vision and electronic design is fascinating."
    }
  ],
  "otherProjects": [
    "Automated Plant Watering System",
    "Solar-Powered Weather Station",
    "Arduino-Based Smart Door Lock",
    "LED Strip Audio Visualizer",
    "Custom Macro Keyboard",
    "WiFi Packet Analyzer Tool",
    "Digital Picture Frame with E-Ink",
    "Remote Environmental Monitor",
    "Custom Bluetooth Game Controller",
    "IoT Plant Health Monitor",
    "Programmable LED Badge",
    "Multi-Zone Temperature Logger",
    "Custom Clock with OLED Weather Display",
    "Bluetooth Speaker Amplifier",
    "Motion-Activated Lighting System",
    "Raspberry Pi Security Camera",
    "Custom Drone Flight Controller",
    "Thermal Imaging Camera Interface",
    "Voice-Controlled Home Assistant",
    "CNC Router Control Software",
    "3D Printer Auto-Leveling System",
    "Ham Radio Packet Modem",
    "Solar Panel MPPT Controller",
    "Custom Bench Power Supply",
    "Function Generator with DDS",
    "Logic Analyzer Using FPGA",
    "Real-Time Spectrum Analyzer",
    "Robotic Arm Control System",
    "Machine Learning Edge Device",
    "Custom Synthesizer Sequencer",
    "MIDI to CV Converter",
    "Analog Delay Effect Pedal",
    "Digital Reverb Algorithm",
    "Neural Network Audio Classifier",
    "Real-Time Pitch Correction",
    "Granular Synthesis Engine",
    "Physical Modeling Synthesizer",
    "Interactive Light Installation",
    "Motion Capture System",
    "Computer Vision Object Tracker",
    "Facial Recognition Door System",
    "Gesture-Controlled Drone",
    "Eye-Tracking Mouse Interface",
    "Brain-Computer Interface Experiment",
    "EMG Signal Processing System",
    "Heart Rate Variability Monitor",
    "Sleep Stage Classification",
    "EEG Signal Visualization",
    "Biometric Authentication System",
    "Custom CAD Software Plugin",
    "3D Model Optimization Tool",
    "Parametric Design Generator",
    "Structural Analysis Simulator",
    "Finite Element Mesh Generator",
    "Ray Tracing Renderer",
    "Real-Time Shadow Mapping",
    "Volumetric Lighting Effects",
    "Procedural Texture Generator",
    "Physics Simulation Engine",
    "Particle System Library",
    "Game Engine Audio System",
    "Custom Database Engine",
    "Distributed Computing Framework",
    "Real-Time Data Processing Pipeline",
    "Machine Learning Model Optimizer",
    "Neural Architecture Search Tool",
    "Automated Testing Framework",
    "Code Quality Analysis Tool",
    "Performance Profiling System",
    "Memory Leak Detection Utility",
    "Static Code Analysis Engine",
    "Compiler Optimization Plugin",
    "Custom Programming Language",
    "Domain-Specific Syntax Parser",
    "Interactive Development Environment",
    "Version Control System Extension",
    "Build System Automation Tool",
    "Deployment Pipeline Manager",
    "Container Orchestration System",
    "Microservices Communication Library",
    "API Gateway Implementation",
    "Load Balancer Algorithm",
    "Database Sharding System",
    "Caching Layer Optimization",
    "Message Queue Implementation",
    "Event Streaming Platform",
    "Real-Time Communication Protocol",
    "Blockchain Consensus Algorithm",
    "Cryptocurrency Mining Pool",
    "Smart Contract Verification Tool",
    "Decentralized Storage System",
    "Peer-to-Peer Network Protocol",
    "Cryptographic Hash Function",
    "Digital Signature Implementation",
    "Zero-Knowledge Proof System",
    "Homomorphic Encryption Library",
    "Quantum Key Distribution Simulator",
    "Post-Quantum Cryptography Tools",
    "Side-Channel Attack Detector",
    "Hardware Security Module",
    "Secure Boot Implementation"
  ]
};

// Data integrity check
if (window.EMBEDDED_SITE_DATA) {
  console.log('📦 Embedded data loaded successfully:', {
    explorerLogEntries: window.EMBEDDED_SITE_DATA.explorerLog?.length || 0,
    projects: window.EMBEDDED_SITE_DATA.projects?.length || 0,
    otherProjects: window.EMBEDDED_SITE_DATA.otherProjects?.length || 0
  });
} else {
  console.error('❌ Failed to load embedded data');
}