# Lakpa Sherpa — AI Engineer Portfolio

A modern, high-performance, and responsive personal portfolio website built for **Lakpa Sherpa**, an **AI Engineer** based in **Kathmandu, Nepal**.

Built with **HTML5**, **Bootstrap 5.3**, **Custom CSS (Glassmorphism & Ambient Glows)**, and **Vanilla JavaScript**.

---

## 👤 Personal Information
- **Name**: Lakpa Sherpa
- **Professional Title**: AI Engineer
- **Location**: Kathmandu, Nepal
- **Experience**: 3 years as an AI Engineer
- **Education**: BSc (Hons) Computer Science with AI — Coventry University, Softwarica College of IT and E-Commerce
- **Phone**: [9768614772](tel:9768614772)
- **Email**: [lakpascience@gmail.com](mailto:lakpascience@gmail.com)
- **GitHub**: Link to be added
- **LinkedIn**: Link to be added
- **Portfolio**: Link to be added

---

## ✨ Features & Sections Included

1. **Home / Hero Section**:
   - Modern name and title presentation with dynamic AI typewriter effect.
   - Kathmandu, Nepal location indicator and availability badge.
   - Quick action buttons ("View My Projects", "Download Resume", "Contact Me").
   - AI & technology-themed visual illustration with floating tech badges.
   - GitHub and LinkedIn link placeholders.

2. **About Me**:
   - Professional overview highlighting 3 years of experience as an AI Engineer with an interest in robotics.
   - Profile image placeholder (`assets/img/avatar-lakpa.svg`) that can be replaced anytime.

3. **Skills Section (10 Categorized Domains, No Fake Percentages)**:
   - **Programming Languages**: Python, JavaScript, SQL, HTML, CSS
   - **Artificial Intelligence**: AI, Machine Learning, Deep Learning, Generative AI, NLP, Computer Vision, LLMs, RAG, AI Agents, Prompt Engineering
   - **Machine Learning**: Supervised/Unsupervised Learning, Feature Engineering, Model Training & Evaluation, Preprocessing, Classification, Regression, Clustering
   - **Deep Learning**: Neural Networks, CNN, RNN, Transformers, Transfer Learning
   - **AI / Python Libraries**: NumPy, Pandas, Matplotlib, Scikit-learn, PyTorch, TensorFlow, OpenCV
   - **Web Development**: Flask, FastAPI, React, REST APIs, Backend & Frontend Development
   - **Databases**: MySQL, PostgreSQL, SQLite, MongoDB, Database Design
   - **Developer Tools**: Git, GitHub, Docker, VS Code, Linux
   - **Cloud / Deployment**: AWS, Vercel, Cloud deployment, API deployment
   - **AI Tools**: OpenAI API, AI coding assistants, n8n, AI automation tools
   - Interactive quick-filter category tabs.

4. **Projects Showcase**:
   - **Featured Project**: *Student Management System* (Python, Flask, MySQL, HTML, CSS, JavaScript) with CRUD operations, search, academic records, and admin dashboard.
   - Only the *Student Management System* is currently listed.
   - Interactive Quick View modal.

5. **Experience**:
   - 3 years of experience as an AI Engineer.
   - Note that specific company or client details can be customized.

6. **Education**:
   - Higher Secondary Education (+2) at St. Lawrence College.
   - BSc (Hons) Computer Science with AI at Coventry University and Softwarica College of IT and E-Commerce.

7. **Certifications**:
   - Certifications section is currently empty.

8. **Dedicated Resume Section**:
   - Overview card of qualifications.
   - Direct PDF download button linked to `assets/docs/Lakpa_Sherpa_Resume.pdf`.
   - "View Resume" modal preview button.

9. **Contact & Social**:
   - Clickable phone link (`tel:9768614772`) and email link (`mailto:lakpascience@gmail.com`).
   - Clean contact form with client-side validation and responsive toast notification.

10. **Design & Responsiveness**:
    - Dark mode by default with one-click theme switcher.
    - Fully responsive across mobile, tablet, laptop, and desktop.
    - Zero fake statistics, fake companies, or fake testimonials.

---

## 🚀 How to Run Locally

### Option 1: Python HTTP Server (Recommended)
Inside the `d:\portfolio` directory, run:
```powershell
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Option 2: Direct Browser Launch
Double click [`index.html`](file:///d:/portfolio/index.html) or open it with your web browser.

---

## 🛠️ How to Customize

1. **Replace Profile Photo**:
   - Place your profile photo in `assets/img/` and update `<img src="assets/img/avatar-lakpa.svg" ...>` in [`index.html`](file:///d:/portfolio/index.html).
2. **Replace Resume PDF**:
   - The downloadable `assets/docs/Lakpa_Sherpa_Resume.pdf` contains the current resume details.
3. **Profile Links**:
   - Add your GitHub, LinkedIn, and portfolio URLs in the profile placeholders in [`index.html`](file:///d:/portfolio/index.html).
4. **Add New Projects**:
   - In [`index.html`](file:///d:/portfolio/index.html) (under `#projects`) and [`js/main.js`](file:///d:/portfolio/js/main.js) (under `projectData`), you can easily add additional project objects and cards.
