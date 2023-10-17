import validate from 'validate.js'

let randomPassword = (length: number) => {
  let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  let pass = "";
  for (let x = 0; x < length; x++) {
    let i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  return pass;
}

export const generatePwd = (length: number) => randomPassword(length || 8);

export function generateCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

export const getPathFromUrl = (url: string) => url.split("?")[0];

export const firstCharUpperCase = (value: string | null | undefined) => {
  if (!value) return ''
  return `${value.charAt(0).toUpperCase()}${value.substr(1, value.length)}`
}

export const firstEachWordUppercase = (value: string | null | undefined, splitCharacter = '_') => {
  if (!value) return;
  var separateWord = value.toLowerCase().split(splitCharacter);
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

export const getSlug = (value: string | null | undefined, replaceCharacter = '-') => {
  if (!value) return;

  let slug;
  slug = value.toLowerCase().trim();

  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, replaceCharacter);
  slug = slug.replace(/ /gi, replaceCharacter);

  slug = slug.replace(/\-\-\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-/gi, replaceCharacter);
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

export const parseErrors = (fields: any[], rules: any[]) => {
  const validationErrs = {} as any
  const errors = validate(fields, rules) || {}
  if (errors) {
    Object.keys(errors).forEach((errorKey) => {
      validationErrs[errorKey] = errors[errorKey][0]
    })
  }
  return validationErrs
}

export const parseQueryString = (value: string) => {

  let str = value;
  let objURL: { [key: string]: string } = {};

  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      objURL[$1] = $3 || '';
      return '';
    }
  );
  return objURL;
};

export const getDisplayName = (val: {
  name?: string;
  title?: string;
  subject?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
}) => {
  if (val) {
    if (val.name) {
      return val.name;
    }
    else if (val.title) {
      return val.title;
    }
    else if (val.subject) {
      return val.subject;
    }
    else if (val.fullName) {
      return val.fullName;
    }
    else if (val.firstName || val.lastName) {
      return `${val.firstName || ""} ${val.lastName || ""}`
    }
    else return "";
  }
  else return "";
}

export function formatNumber(val: string, minimumFractionDigits = 2, maximumFractionDigits = 2) {
  const number = parseFloat(val);
  const formattedNumber = number.toLocaleString('en-US', {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits, // Set a high maximum to prevent rounding
    useGrouping: true,
    currency: 'USD',
    style: 'decimal',
  });
  if (Number.isInteger(number)) {
    // If the number is an integer, remove the ".00" decimal part
    return formattedNumber.replace(/\.00$/, '');
  } else {
    return formattedNumber;
  }
}

export const saveCSVData = (data: any, fileName: string) => {
  const a = document.createElement("a");
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(a);
  const blob = new Blob([data], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  a.onclick = () => {
    window.URL.revokeObjectURL(url);
    body.removeChild(a);
  };
  a.click();
}