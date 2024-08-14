# Introduction

Welcome to the Paperbridge User Manual. This document serves as a comprehensive guide to understanding how Paperbridge operates, from converting PDFs to MMD (Mathpix Markdown) using advanced AI models, to editing and exporting the content using a specially designed browser extension. Paperbridge is designed to enhance the accessibility, editability, and overall usability of scientific documents, especially those that contain complex mathematical expressions, figures, and tables.


???+ Tip

    For project code and to download files visit [github.com](https://github.com/5rijan/PaperBridge).


### Why Paperbridge?

Scientific knowledge is predominantly stored in books and scientific journals, often in the form of PDFs. However, the PDF format leads to a significant loss of semantic information, particularly for mathematical expressions and scientific figures. Paperbridge addresses these challenges by converting PDFs into Mathpix Markdown (MMD), a markup language that preserves the document's structural and semantic integrity.

## How Paperbridge Works

### 1. Conversion Process Using Nougat AI

#### 1.1 Why Nougat?

Paperbridge uses Nougat (Neural Optical Understanding for Academic Documents), a Visual Transformer model specifically designed for processing scientific documents into a markup language. Here's why Nougat was chosen over alternatives like Grobid:

- **Superior Mathematical Extraction:** Nougat excels in accurately converting mathematical expressions and scientific notations from PDFs into markup languages. This is crucial for academic papers where mathematical accuracy is paramount.
  
- **Enhanced Table Extraction:** Unlike OCR-based models like Grobid, which may falter with complex scientific tables, Nougat provides a more reliable extraction method, preserving the structure and content of tables.

- **Semantic Preservation:** Grobid and similar OCR-based solutions are faster because they primarily focus on text recognition. However, they often fail to capture the semantic relationships between text and figures, particularly in scientific documents. Nougat, on the other hand, bridges the gap between human-readable documents and machine-readable text, enhancing accessibility and usability.

???+ Info

    For project code and more information realted to the Nougat project visit [github.com](https://github.com/facebookresearch/nougat).

#### 1.2 How Nougat Works

Nougat performs an Optical Character Recognition (OCR) task tailored for scientific documents. It uses a Visual Transformer model that understands the structure and content of scientific documents, including complex mathematical expressions. The model has been trained on a large dataset of scientific papers, ensuring high accuracy in converting PDFs to Mathpix Markdown.

**Key Features of Nougat:**

- **Visual Transformer Model:** This model is designed to interpret the visual layout of scientific documents, ensuring accurate conversion of text, figures, and tables.
- **Semantic Understanding:** Nougat retains the semantic relationships within the document, particularly important for preserving the meaning of mathematical expressions and scientific notations.
- **Open Source and Accessible:** The models and code for Nougat are open-source, accelerating future work on scientific text recognition and ensuring wide accessibility.

### 2. Image and Metadata Extraction Using PDFFigures 2.0

#### 2.1 Why PDFFigures 2.0?

In addition to text and mathematical expression extraction, Paperbridge also extracts images and their associated metadata using PaperPDFFigures 2.0. This tool was chosen because of its advanced capabilities in identifying and extracting figures and tables from scientific documents.

???+ Info

    For project code and more information realted to the PDFFigures 2.0 project visit [github.com](https://github.com/allenai/pdffigures2).

#### 2.2 How PDFFigures 2.0 Works

PDFFigures 2.0 analyzes the structure of individual pages in a PDF document. It does this by detecting captions, graphical elements, and chunks of body text. The algorithm then locates figures and tables by reasoning about the empty regions within the text. This method ensures that figures and tables are accurately identified and extracted, along with their captions and relevant metadata.

**Key Features of PDFFigures 2.0:**

- **High Precision and Recall:** The algorithm achieves an impressive 94% precision at 90% recall on a dataset of computer science papers, surpassing previous state-of-the-art methods.
- **Comprehensive Extraction:** Not only are figures and tables extracted, but also their captions and metadata, ensuring that the context of these elements is preserved.
- **Ground Truth Dataset:** The extraction method has been evaluated against a ground truth dataset, ensuring its reliability and accuracy.

### 3. Editing and Exporting with the Paperbridge Extension

#### 3.1 The Paperbridge Extension

Once the PDF has been converted to MMD and the images and metadata have been extracted, users can edit the document using the Paperbridge extension. This browser extension is designed to make the editing process seamless and intuitive, allowing for a wide range of customizations and enhancements.

**Key Features of the Paperbridge Extension:**

- **Editing MMD Text:** Users can easily edit the text within the MMD document, making changes to the content as needed.
- **Inserting Images and Tables:** The extension allows users to insert images and CSV tables into the MMD document, making it easy to enrich the content with additional data and visuals.
- **Export Options:** The final document can be exported in both MMD and HTML formats. The HTML version comes with additional features like font size and family customization, dark mode, a table of contents, and embedded translation options for superior navigation and usability.
  
#### 3.2 Exporting as HTML and PDF

- **HTML Export:** The exported HTML file includes advanced features like adjustable font size and family, dark mode toggle, a dynamically generated table of contents, and integrated translation capabilities. This ensures that the document is not only accessible but also highly customizable to meet the user's preferences.
  
- **PDF Export:** The extension also allows users to export the edited document as a PDF. This ensures that the final output can be shared in the widely-used PDF format while still retaining the enhancements made during the editing process.

### 4. Bringing It All Together

Paperbridge is a comprehensive solution for converting, editing, and exporting scientific documents. By leveraging the strengths of Nougat AI for accurate text and mathematical extraction, and PDFFigures 2.0 for precise image and metadata extraction, Paperbridge ensures that the final output is both semantically rich and highly usable. The Paperbridge extension further enhances this by providing a user-friendly interface for editing and exporting the document in multiple formats, ensuring that scientific knowledge is accessible, editable, and shareable across different platforms.

## About This Project

This project is part of a larger ongoing research aimed at enhancing the accessibility and usability of research papers. By converting PDFs into more interactive and editable formats like MMD (Mathpix Markdown) and HTML, we hope to make academic content more accessible to a broader audience, including those from non-English-speaking countries. If you're interested in contributing to this research as a participant or have suggestions for improving the project, we'd love to hear from you! Your insights and feedback are invaluable to us. Please reach out via email at [mail](mailto:srijanchaudhary2003@gmail.com).

