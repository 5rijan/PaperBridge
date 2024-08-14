# Conversion 

## Overview

This document provides a detailed guide on converting a PDF into Mathpix Markdown (MMD) format using PaperBridge. Follow these steps to install the necessary libraries, execute the conversion, and manage any potential issues.

For Google collab code and to download files visit [colab.research.google.com](https://colab.research.google.com/drive/1U3m9piTPLEf3CAjxAr5poBXnz4JypU9b?usp=sharing).

???+ Tip

    Make sure if you're working in google collab you change your runtime to any GPU based hardware accelerator. 

## Installation of Required Libraries

### Uninstall Existing Packages

To avoid conflicts with existing packages, first uninstall any previously installed versions:

```py
!pip uninstall -y torch torchvision torchaudio transformers albumentations nougat-ocr
```

## Install Specific Versions of Required Packages
Install the specific versions of the required packages:

```py
!pip install torch==2.1.0 torchvision==0.15.1 torchaudio==2.1.0
!pip install transformers==4.25.1 timm==0.5.4 orjson opencv-python-headless
!pip install datasets[vision] lightning>=2.0.0,<2022 nltk python-Levenshtein
!pip install sentencepiece sconf>=0.2.3 pypdf>=3.1.0 pypdfium2
!pip install albumentations==1.1.0

# Install nougat-ocr
!pip install nougat-ocr

```

## Verify Installations
Ensure that all the packages have been installed correctly:

```py
!pip list | grep -E 'torch|transformers|nougat-ocr|albumentations'

```

## Download the JAR File
Download the pdffigures2.jar file, which is used for image and metadata extraction:

```py
!wget -O /content/pdffigures2.jar "https://github.com/5rijan/PaperBridge/blob/main/pdffigures2.jar"

```

## Conversion Process
### Step 1: Download the PDF
To start the conversion process, download the PDF that you want to convert:


``` py
import requests
import os
from urllib.parse import urlparse
import re

# Function to download PDF
def download_pdf(url, output_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
        print("PDF downloaded successfully.")
    else:
        print(f"Failed to download PDF. Status code: {response.status_code}")

# Function to get the base file name from the URL
def get_file_name_from_url(url):
    parsed_url = urlparse(url)
    file_name = os.path.basename(parsed_url.path)
    return re.sub(r'\.pdf$', '', file_name)  # Remove .pdf extension for naming

pdf_url = input("Please enter the PDF URL: ")
base_file_name = get_file_name_from_url(pdf_url)
pdf_path = f'/content/{base_file_name}.pdf'
output_directory = '/content/output_directory'
os.makedirs(output_directory, exist_ok=True)
download_pdf(pdf_url, pdf_path)

```

### Step 2: Convert PDF to MMD and Extract Images
Run the Nougat OCR tool to convert the PDF to MMD format and extract images and metadata:

```py
try:
    !nougat {pdf_path} -o {output_directory} --no-skipping -m 0.1.0-base
except Exception as e:
    print(f"Nougat command failed: {e}")

```

Use the pdffigures2.jar file to extract images and metadata:

```py
jar_file_path = "/content/pdffigures2.jar"

!java -jar {jar_file_path} \
    -i 150 \
    -s {output_directory}/{base_file_name}_stats.json \
    -g {output_directory}/{base_file_name}_fulltext.json \
    -m {output_directory}/{base_file_name}- \
    -f png \
    {pdf_path}

```

### Step 3: Prepare Files for Download
After conversion, you can prepare the files for download. Use the following Python script to manage the output files:

```py
import shutil
from google.colab import files

# Function to zip and download files
def zip_and_download(zip_name, items):
    shutil.make_archive(zip_name, 'zip', base_dir=zip_name)
    files.download(f"{zip_name}.zip")

# Function to prepare MMD files for download
def prepare_mmd_for_download(directory_path, base_file_name, zip_dir):
    mmd_file_name = f"{base_file_name}.mmd"
    mmd_file_path = os.path.join(directory_path, mmd_file_name)
    if os.path.isfile(mmd_file_path):
        shutil.copy(mmd_file_path, zip_dir)
        print(f"Added {mmd_file_name} to the zip.")
    else:
        print(f"No .mmd file found in {directory_path}.")

# Function to prepare image files and JSON for download
def prepare_images_and_json_for_download(directory_path, base_file_name, zip_dir):
    image_files = [f for f in os.listdir(directory_path) if f.startswith(f"{base_file_name}-") and f.endswith(('.png', '.jpg', '.jpeg'))]
    json_files = [f for f in os.listdir(directory_path) if f.startswith(f"{base_file_name}_") and f.endswith('.json')]

    if image_files:
        images_dir = os.path.join(zip_dir, 'images')
        os.makedirs(images_dir, exist_ok=True)
        for image in image_files:
            shutil.copy(os.path.join(directory_path, image), images_dir)
        print(f"Added images to the zip.")
    for json_file in json_files:
        shutil.copy(os.path.join(directory_path, json_file), zip_dir)
        print(f"Added JSON file {json_file} to the zip.")

    if not image_files and not json_files:
        print(f"No image files or JSON data found for {base_file_name}.")

pdf_url = input("Please enter the PDF URL: ")
base_file_name = get_file_name_from_url(pdf_url)
pdf_path = f'/content/{base_file_name}.pdf'
output_directory = '/content/output_directory'
zip_directory = f'/content/{base_file_name}_download'
os.makedirs(zip_directory, exist_ok=True)

print("Choose an option:")
print("1. Download converted MMD document")
print("2. Download images and JSON data")
print("3. Download both MMD document and images with JSON data")

option = input("Enter your choice (1/2/3): ")

if option == '1':
    prepare_mmd_for_download(output_directory, base_file_name, zip_directory)
elif option == '2':
    prepare_images_and_json_for_download(output_directory, base_file_name, zip_directory)
elif option == '3':
    prepare_mmd_for_download(output_directory, base_file_name, zip_directory)
    prepare_images_and_json_for_download(output_directory, base_file_name, zip_directory)
else:
    print("Invalid choice. Please enter 1, 2, or 3.")

zip_and_download(zip_directory, base_file_name)

```



## Common Issues

??? question "What should I do if I encounter library installation failures?"
    Ensure that you have a stable internet connection and are installing the correct version of each package. Check for any compatibility issues and update the packages if necessary.

??? question "What if the file is not found?"
    Verify that the file paths and URLs are correct. Ensure the PDF is downloaded and exists in the specified directory.

??? question "What should I do if the Nougat command fails?"
    Check the Nougat installation and ensure it is the correct version. Verify that the command syntax is correct and that the output directory is writable.

## Workarounds

??? question "How can I resolve installation issues?"
    Try reinstalling the libraries using the pip commands provided in the installation section.

??? question "What if I encounter file permission issues?"
    Ensure that you have the necessary permissions to read and write files in the specified directories.

??? question "What should I do if the JAR file execution fails?"
    Make sure the JAR file is correctly downloaded and is compatible with your system.
