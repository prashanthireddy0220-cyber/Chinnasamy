import { professorData } from './professorData';

/**
 * Intelligent Academic AI Knowledge Engine for Dr. P. Chinnasamy
 * Handles natural language questions, conversational greetings, AI training models,
 * research specializations, publications, patents, supervision, and contact queries.
 */
export const generateAIResponse = (query: string): string => {
  const q = query.toLowerCase().trim();

  // 1. GREETINGS & CASUAL CONVERSATION
  if (
    /^(hi|hello|hey|hola|namaste|vanakkam|good morning|good afternoon|good evening|greetings|yo|sup|start|help|menu|options)\b/i.test(q) ||
    q === 'hi' || q === 'hello' || q === 'hey' || q === 'vanakkam'
  ) {
    return `👋 Hello and welcome! I am the **Research AI Assistant** for **Dr. P. Chinnasamy** — Associate Professor at Kalasalingam Academy of Research and Education (KARE) and recognized among the **World Top 2% Scientists** by Stanford University (2025 & 2026).

I can answer any questions about:
• 🤖 **AI & Machine Learning**: Trained neural models (CNN, LSTM, Multimodal AI, AI-MFA)
• 🔒 **Cybersecurity & Cryptography**: CP-ABE, Cloud Access Control, Zero-Day Intrusion Detection
• 📚 **Publications**: 150+ papers across IEEE, Springer, Elsevier (SCI/SCIE Indexed)
• 💡 **Patents**: 17 patents (Australian & Indian Design granted patents)
• 🎓 **Ph.D. Supervision**: Research scholars & Anna University Recognition (#4140166)
• 📄 **CV & Contact**: Direct email, phone, and official PDF CV download

What would you like to explore today?`;
  }

  // 2. "WHO ARE YOU" / "WHAT CAN YOU DO" / BOT IDENTITY
  if (
    q.includes("who are you") ||
    q.includes("what can you do") ||
    q.includes("what is this") ||
    q.includes("your name") ||
    q.includes("about you")
  ) {
    return `🤖 I am the dedicated **Research AI Assistant** for Dr. P. Chinnasamy's academic portfolio. I have been trained on his comprehensive curriculum vitae, 150+ peer-reviewed publications, 17 patents, Ph.D. supervision records, and research grants across Artificial Intelligence, Cybersecurity, Cryptography, and Cloud Security.

Ask me anything about his research, trained AI models, publications, awards, or collaboration opportunities!`;
  }

  // 3. TRAIN MODELS AI / MACHINE LEARNING & DEEP LEARNING ARCHITECTURES
  if (
    q.includes("train model") ||
    q.includes("training model") ||
    q.includes("train models ai") ||
    q.includes("trained model") ||
    q.includes("machine learning model") ||
    q.includes("deep learning model") ||
    q.includes("neural network") ||
    q.includes("cnn") ||
    q.includes("lstm") ||
    q.includes("algorithm") ||
    q.includes("multimodal") ||
    q.includes("dataset") ||
    q.includes("model architecture")
  ) {
    return `🤖 **Dr. P. Chinnasamy's Work on Training AI & Machine Learning Models**:

Dr. Chinnasamy's research actively trains and deploys deep learning and machine learning models for high-impact healthcare diagnostics and cybersecurity systems:

1. **Healthcare Diagnostic Models (CNN & Hybrid CNN-LSTM)**:
   • Trained on biomedical datasets for **Chronic Kidney Disease (CKD)** prediction, **lung cancer classification**, and **drug-drug interaction** prediction.
   • Employs transfer learning, data augmentation, and regularization to achieve high diagnostic precision on imbalanced medical datasets.

2. **Multimodal Machine Learning Models**:
   • Co-Principal Investigator on the **UTAR International Research Fund** project: developing multimodal architectures combining acoustic speech signals and behavioral markers for early detection of **Postpartum Depression**.

3. **Cybersecurity & Intrusion Detection Models**:
   • Trains ensemble models (**Random Forest, XGBoost, Deep Neural Networks**) for real-time threat detection, polymorphic malware analysis, and 6G network intrusion classification.
   • Designs **AI-based Multi-Factor Authentication (AI-MFA)** utilizing computer vision facial liveness scanning to prevent spoofing attacks.

4. **Privacy-Preserving Training & Access Control**:
   • Researches federated learning techniques integrated with **Ciphertext-Policy Attribute-Based Encryption (CP-ABE)** to ensure training data and patient records remain end-to-end encrypted during cloud model training.

Would you like details on a specific publication or application among these models?`;
  }

  // 4. WHO IS DR. CHINNASAMY / BIO / DESIGNATION / UNIVERSITY / LOCATION
  if (
    q.includes("who is") ||
    q.includes("tell me about") ||
    q.includes("bio") ||
    q.includes("profile") ||
    q.includes("designation") ||
    q.includes("position") ||
    q.includes("institution") ||
    q.includes("university") ||
    q.includes("kare") ||
    q.includes("kalasalingam") ||
    q.includes("location") ||
    q.includes("where is he")
  ) {
    return `👨‍🏫 **Dr. P. Chinnasamy** is an Associate Professor in the Department of Computer Science and Engineering at **Kalasalingam Academy of Research and Education (KARE)**, Anand Nagar, Krishnankoil, Tamil Nadu, India.

**Key Highlights**:
• 🌟 **Stanford–Elsevier World Top 2% Scientist (2025 & 2026)** in Artificial Intelligence & Image Processing.
• 🏅 **Senior Research Associate** at Universiti Tunku Abdul Rahman (UTAR), Malaysia (2024–2026).
• 🎓 **Ph.D. in CSE (2019)** from KARE, with M.Tech (CGPA 9.45/10) and B.E. from Anna University.
• 📚 **150+ Publications** (24 SCI/SCIE Indexed with Impact Factors up to 7.104).
• 💡 **17 Patents** (including Australian Innovation Patent & Indian Design Patent).
• 👨‍🎓 **Recognized Ph.D. Supervisor** at KARE & Anna University (#4140166).`;
  }

  // 5. RESEARCH AREAS & DOMAINS
  if (
    q.includes("research area") ||
    q.includes("research interest") ||
    q.includes("focus") ||
    q.includes("domain") ||
    q.includes("specializ") ||
    q.includes("cryptography") ||
    q.includes("cybersecurity") ||
    q.includes("cloud security") ||
    q.includes("blockchain") ||
    q.includes("iot") ||
    q.includes("access control")
  ) {
    return `🔬 **Dr. Chinnasamy's Core Research Specializations**:

1. **Artificial Intelligence & Machine Learning**: Cognitive intelligence engines, autonomous decision models, predictive analytics.
2. **Cybersecurity & Threat Detection**: Polymorphic malware classification, 6G intrusion response, zero-day threat filters.
3. **Cryptography**: Attribute-based encryption (CP-ABE), hybrid cryptographic schemes, visual cryptography for medical imaging.
4. **Cloud Security & Access Control**: Access Control as a Service (ACaaS), fine-grained multi-tenant access control for cloud repositories.
5. **Blockchain Technology**: Medi-Chain pharmaceutical supply chain tracking, smart contracts for educational certificate verification.
6. **Deep Learning for Healthcare**: CNN-LSTM hybrid models for chronic disease screening, lung cancer detection, and drug interaction.
7. **IoT & Sensor Security**: Wireless Sensor Network (WSN) threat mitigation and smart environmental monitoring nodes.`;
  }

  // 6. PUBLICATIONS & PAPERS
  if (
    q.includes("publication") ||
    q.includes("paper") ||
    q.includes("journal") ||
    q.includes("conference") ||
    q.includes("sci") ||
    q.includes("scie") ||
    q.includes("scopus") ||
    q.includes("impact factor") ||
    q.includes("how many paper") ||
    q.includes("book chapter") ||
    q.includes("ieee")
  ) {
    return `📚 **Dr. Chinnasamy's Publication Metrics**:

Dr. Chinnasamy has authored **over 150+ scholarly publications**:
• **24 SCI/SCIE Indexed Journal Papers** in high-impact journals (Springer, IEEE, Elsevier, MDPI) with Impact Factors up to **7.104**.
• **17 Scopus-Indexed Journal Papers**.
• **20 Book Chapters** published by Springer, Elsevier, IGI Global, and CRC Press.
• **88 IEEE International Conference Papers**.

**Selected Notable Works**:
1. *Cognitive AI & Hybrid Cryptography for Cloud Healthcare* (IEEE / Springer).
2. *Medi-Chain: Blockchain-Based Drug Provenance Tracking* (IEEE Access).
3. *AI-MFA: Multi-Factor Authentication with Facial Liveness Detection*.
4. *HCAC-EHR: Hybrid Cloud Access Control for Electronic Health Records*.

You can explore all publications with direct verified DOI links in the **Publications Command Center** on this site!`;
  }

  // 7. PATENTS & INTELLECTUAL PROPERTY
  if (
    q.includes("patent") ||
    q.includes("invention") ||
    q.includes("australian") ||
    q.includes("design patent") ||
    q.includes("granted") ||
    q.includes("intellectual property") ||
    q.includes("how many patent")
  ) {
    return `💡 **Dr. Chinnasamy's Patents (17 Total)**:

1. **Granted Australian Innovation Patent** (App No: 2020100616):
   • *Title*: "Using Wearable Device and Voice Analysis to Track Mental Health".
   • Focuses on wearable sensors, acoustic emotion classification, and stress tracking.

2. **Granted Indian Design Patent** (App No: 434301-001):
   • *Title*: "Smart Solar Weather Monitoring Node".
   • An IoT-enabled solar weather station for automated environmental sensing.

3. **15 Published & Filed Patents** covering:
   • Smart Cradle Infant Monitoring System.
   • WSN Intrusion Detection Protocols.
   • AI-Driven Biometric Multi-Factor Authentication.
   • Privacy-Preserving Cloud Storage Decryption.`;
  }

  // 8. STANFORD RANKING & AWARDS
  if (
    q.includes("stanford") ||
    q.includes("ranking") ||
    q.includes("top 2%") ||
    q.includes("award") ||
    q.includes("honor") ||
    q.includes("achievement") ||
    q.includes("innovator") ||
    q.includes("utar") ||
    q.includes("csi")
  ) {
    return `🏆 **Honors, Awards & Global Recognitions**:

• **Stanford–Elsevier World Top 2% Scientist (2025 & 2026)**: Recognized among the world's most cited researchers in Artificial Intelligence & Image Processing based on composite c-scores, citations, and h-index.
• **IEEE Senior Member (SMIEEE)**: Elevated to prestigious IEEE Senior Member grade (Member # 94203253, Podhigai Subsection, Valid through 2027), an honor held by only 10% of IEEE's 500,000+ members worldwide.
• **Senior Research Associate** @ UTAR Malaysia (2024–2026): International research appointment at Universiti Tunku Abdul Rahman.
• **CSI Cybersecurity Innovator of the Year (2025)**: Awarded by Computer Society of India (Mumbai Chapter) at Cyber FIFC.
• **CSI Innovative Research Award (2024)**: Awarded by CSI Hyderabad Chapter for deep learning and cybersecurity innovations.
• **Toycathon 2021 Primary Evaluator & National Judge**: Conferred official government evaluation certificates by the Ministry of Education, AICTE, MSME, and MIC for judging and evaluating indigenous student innovations.
• **Outstanding Faculty & Researcher Awards**: Received multiple institutional recognitions for high-impact research and academic mentorship.`;
  }

  // 9. PH.D. SUPERVISION & SCHOLARS
  if (
    q.includes("scholar") ||
    q.includes("phd student") ||
    q.includes("supervis") ||
    q.includes("guided") ||
    q.includes("anna university supervisor") ||
    q.includes("doctorate") ||
    q.includes("mentorship")
  ) {
    return `🎓 **Ph.D. Supervision & Doctoral Guidance**:

Dr. Chinnasamy is an officially recognized Ph.D. Supervisor at:
• **Kalasalingam Academy of Research and Education (KARE)**
• **Anna University, Chennai** (Supervisor Recognition No: **4140166**)

**Supervised Scholars**:
1. **Geethu Lakshmi G** — Ph.D. Defended (Cloud Security & Cryptographic Access Control).
2. **Deepthi K Moorthy** — In Progress (Deep Learning for Medical Image Diagnostics).
3. **Roshni Rajendran** — In Progress (Blockchain for Healthcare Provenance).
4. **Darshan P** — In Progress (Cybersecurity & Intrusion Detection).
5. **Dastageer K** — In Progress (IoT Security Protocols).
6. **Mani G** — Comprehensive Viva Completed.`;
  }

  // 10. EDUCATION & QUALIFICATIONS
  if (
    q.includes("education") ||
    q.includes("qualification") ||
    q.includes("degree") ||
    q.includes("thesis") ||
    q.includes("phd") ||
    q.includes("m.tech") ||
    q.includes("b.e") ||
    q.includes("cgpa")
  ) {
    return `🎓 **Dr. Chinnasamy's Academic Degrees**:

1. **Ph.D. in Computer Science & Engineering** (March 2019, KARE):
   • *Thesis Title*: "Design of Enhanced and Scalable Access Control Mechanisms for Cloud Storage System".
2. **M.Tech in CSE** (2015, KARE):
   • *CGPA*: **9.45 / 10** (First Class with Distinction).
3. **B.E. in Computer Science & Engineering** (2013, Anna University):
   • First Class graduate in CSE.`;
  }

  // 11. FUNDED PROJECTS & RESEARCH GRANTS
  if (
    q.includes("funded") ||
    q.includes("grant") ||
    q.includes("project") ||
    q.includes("budget") ||
    q.includes("funding") ||
    q.includes("serb")
  ) {
    return `💼 **Funded Research Projects & Grants**:

• **UTAR International Research Fund (UTARRF)**:
  - *Project*: "A MultiModal Machine Learning Framework for Early Detection of Postpartum Depression".
  - *Grant Amount*: **RM 24,000** (~₹4.5 Lakhs).
  - *Role*: Co-Principal Investigator (Co-PI) with Universiti Tunku Abdul Rahman, Malaysia (2025–2026).
• **SERB-SRG COVID-19 Surveillance Systems**:
  - Research investigations into automated screening and contact-tracing data protection.`;
  }

  // 12. PROFESSIONAL MEMBERSHIPS
  if (
    q.includes("membership") ||
    q.includes("society") ||
    q.includes("ieee") ||
    q.includes("csi") ||
    q.includes("acm")
  ) {
    return `🏛️ **Official Professional Memberships**:

Dr. Chinnasamy is an active member of 3 premier global computer science societies:
1. **IEEE Education Society** — Professional Member (Member #**94203253**).
2. **Computer Society of India (CSI)** — Professional Member (Member #**I1504958**).
3. **Association for Computing Machinery (ACM)** — Professional Member.`;
  }

  // 12B. CONFERENCES, SESSION CHAIR & GUEST OF HONOR
  if (
    q.includes("conference") ||
    q.includes("session chair") ||
    q.includes("guest of honor") ||
    q.includes("keynote") ||
    q.includes("thiruthangal") ||
    q.includes("thiruthankal") ||
    q.includes("iccci") ||
    q.includes("sri shakthi") ||
    q.includes("academic service")
  ) {
    return `🌐 **Conference Leadership & Academic Service**:

Dr. Chinnasamy actively serves premier international and national computing conferences:
• 🎙️ **IEEE International Conference Session Chair (ICCCI)**:
  - Technical Session Chair & Evaluator at the IEEE International Conference on Computer Communication and Informatics (ICCCI) organized with IEEE Region 10 at Sri Shakthi Institute of Engineering & Technology.
  - Evaluated peer-reviewed paper tracks in Artificial Intelligence, Cloud Security, and Distributed Networks.
• 🏅 **Guest of Honor @ National Conference, Thiruthangal Nadar College, Chennai**:
  - Conferred the distinction of Guest of Honor, gracing the central presidential dais alongside college trustees and principal during the grand inauguration ceremony.
• 📢 **National Seminar Keynote Speaker (ICSSR-MHRD Sponsored)**:
  - Invited Keynote Speaker on *"Machine Learning Applications in Crime Prediction"* at Thiruthangal Nadar College, Chennai.
• 🏛️ **AICTE National FDP Convener**:
  - Organized and convened the two-week AICTE-sponsored Faculty Development Program on Blockchain Technology & Applications for 100+ educators nationwide.
• ⚖️ **National Jury Evaluator**:
  - Appointed primary evaluator for Smart India Hackathon (SIH 2022) & Toycathon by the Ministry of Education Innovation Cell (MIC) & AICTE.`;
  }

  // 12.5. PROFESSIONAL MEMBERSHIPS & IEEE SENIOR MEMBER
  if (
    q.includes("membership") ||
    q.includes("ieee") ||
    q.includes("senior member") ||
    q.includes("society") ||
    q.includes("societies") ||
    q.includes("csi member") ||
    q.includes("acm")
  ) {
    return `🌐 **Professional Memberships & Affiliations**:

1. 🔷 **IEEE Senior Member (SMIEEE)**:
   - **Grade**: Senior Member (held by only ~10% of 500,000+ IEEE members worldwide)
   - **Member ID**: 94203253 | **Subsection**: Podhigai Subsection, Region 10
   - **Validity**: Valued IEEE Member for 4 years (Valid through 31 December 2027)
   - **Affiliation**: IEEE Education Society & Global Computing Initiatives

2. 🟢 **Computer Society of India (CSI)**:
   - **Grade**: Official Life Member (CSI ID: 702224018)
   - **Honors**: Conferred *Cyber Security Innovator of the Year (2025)* and *Innovative Research Award (2024)*

3. 🟣 **Association for Computing Machinery (ACM)**:
   - **Grade**: Professional Member of ACM, the world's largest computing society.`;
  }

  // 13. CONTACT DETAILS & HOW TO CONNECT
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("address") ||
    q.includes("reach") ||
    q.includes("collaborate") ||
    q.includes("hire") ||
    q.includes("meeting") ||
    q.includes("office")
  ) {
    return `📬 **Get in Touch with Dr. P. Chinnasamy**:

• ✉️ **Email**: chinnasamyponnusamy@gmail.com
• 📞 **Phone**: +91 9600281664
• 📍 **Office**: Department of Computer Science & Engineering, Kalasalingam Academy of Research and Education (KARE), Anand Nagar, Krishnankoil, Tamil Nadu 626126, India.
• 💼 **LinkedIn**: https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/

You can also submit an inquiry directly using the **CONNECT** form on this website!`;
  }

  // 14. CV / RESUME DOWNLOAD
  if (
    q.includes("cv") ||
    q.includes("resume") ||
    q.includes("download") ||
    q.includes("pdf")
  ) {
    return `📄 **Curriculum Vitae (PDF)**:

You can view and download Dr. Chinnasamy's official, updated Curriculum Vitae by clicking the **"CV (PDF)"** button in the Hero section or top navigation bar. It includes complete publication lists, patent grant numbers, project grants, and teaching portfolios!`;
  }

  // 15. RESEARCH PROFILE LINKS (Scopus, WoS, Scholar, Vidwan, ORCID)
  if (
    q.includes("scopus") ||
    q.includes("web of science") ||
    q.includes("wos") ||
    q.includes("vidwan") ||
    q.includes("scholar") ||
    q.includes("orcid") ||
    q.includes("researchgate") ||
    q.includes("h-index") ||
    q.includes("citations")
  ) {
    return `🔗 **Dr. Chinnasamy's Official Academic Profile Links**:

• **Scopus Profile**: https://www.scopus.com/authid/detail.uri?authorId=57201503238
• **Web of Science (WoS)**: https://www.webofscience.com/wos/author/record/W-8274-2018
• **Vidwan Database**: https://vidwan.inflibnet.ac.in/profile/179307
• **Google Scholar**: https://scholar.google.com/citations?user=d1GhC-4AAAAJ
• **ORCID Profile**: https://orcid.org/0000-0002-3202-4299
• **ResearchGate**: https://www.researchgate.net/profile/Chinnasamy-Ponnusamy
• **LinkedIn**: https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/`;
  }

  // 16. TEACHING & ACADEMIC SUBJECTS
  if (
    q.includes("teach") ||
    q.includes("subject") ||
    q.includes("course") ||
    q.includes("class") ||
    q.includes("syllabus")
  ) {
    return `📖 **Teaching & Academic Courses**:

Dr. Chinnasamy teaches undergraduate and postgraduate courses in Computer Science & Engineering, including:
• Cryptography & Network Security
• Cybersecurity & Ethical Hacking
• Artificial Intelligence & Machine Learning
• Cloud Computing & Cloud Security
• Operating Systems & Distributed Systems
• Database Management Systems`;
  }

  // 17. INSTITUTIONAL LEADERSHIP
  if (
    q.includes("leadership") ||
    q.includes("hod") ||
    q.includes("naac") ||
    q.includes("role") ||
    q.includes("committee")
  ) {
    return `🏛️ **Academic Leadership Roles**:

At Kalasalingam Academy of Research and Education (KARE), Dr. Chinnasamy has served in key institutional roles:
• **In-charge Head of Department (HoD)** — Department of CSE
• **NAAC Criteria 3 Lead** — Research, Innovations and Extension
• **Department R&D In-charge** — Fostering faculty and student research publications
• **Department Patent In-charge** — Facilitating patent filings and intellectual property protection`;
  }

  // 18. COURTEOUS EXITS & GRATITUDE
  if (
    q.includes("thank") ||
    q.includes("thanks") ||
    q.includes("bye") ||
    q.includes("goodbye") ||
    q.includes("awesome") ||
    q.includes("great")
  ) {
    return `🙏 You're very welcome! If you have any more questions about Dr. P. Chinnasamy's research, publications, or collaborations, feel free to ask anytime. Have a wonderful day!`;
  }

  // 19. INTELLIGENT COMPREHENSIVE FALLBACK (NEVER gives "I don't have that information")
  return `💡 **Regarding your question ("${query}")**:

Dr. P. Chinnasamy is an Associate Professor at Kalasalingam Academy of Research and Education (KARE) and ranks among the **World Top 2% Scientists** (Stanford–Elsevier, 2025 & 2026). His expertise spans:
• **Artificial Intelligence & Deep Learning**: Training CNN, LSTM, and multimodal models for healthcare diagnostics and threat classification.
• **Cybersecurity & Cryptography**: Attribute-based encryption (CP-ABE), cloud access control, and zero-day intrusion detection.
• **Scholarly Output**: 150+ publications and 17 patents (including granted Australian and Indian Design patents).

You can explore detailed sections across this website (Research, Publications, Patents, Supervision, Awards), or reach out directly to Dr. Chinnasamy at **chinnasamyponnusamy@gmail.com** or **+91 9600281664**!`;
};
