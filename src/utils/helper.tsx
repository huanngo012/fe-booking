// @ts-ignore
import * as pdfjs from "pdfjs-dist";

// @ts-ignore
import * as workerSrc from "pdfjs-dist/build/pdf.worker.mjs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const getBase64 = (file: any) => {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatMoney = (number: any) =>
  Number(Number(number)?.toFixed(1)).toLocaleString();

export const renderStartFromNumber = (number: number, size: number) => {
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="orange" size={size} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="orange" size={size} />);
  }
  return stars;
};

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const readFileData = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

//param: file -> the input file (e.g. event.target.files[0])
//return: images -> an array of images encoded in base64
export const convertPdfToImages = async (file: File) => {
  const data = await readFileData(file);

  if (data) {
    const pdf = await pdfjs.getDocument(data).promise;
    const canvas = document.createElement("canvas");

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    context &&
      (await page.render({ canvasContext: context, viewport: viewport })
        .promise);
    let images = canvas.toDataURL("image/jpeg", 1);

    canvas.remove();
    return images;
  }
};

export const handleSplitName = (fullName: string) => {
  const firstName: string = fullName.substring(0, fullName.lastIndexOf(" "));
  const lastName: string = fullName.substring(
    fullName.lastIndexOf(" ") + 1,
    fullName.length
  );

  return { firstName, lastName };
};
