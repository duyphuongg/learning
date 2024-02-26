const languages = {
  popular_languages: [
    {
      name: "English",
      native_name: "English",
      flag_code: "gb",
      is_secondary: 0,
      is_add: true,
      support_google: true,
      locale: "en",
    },
    {
      name: "French",
      native_name: "Français",
      flag_code: "fr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "fr",
    },
    {
      name: "German",
      native_name: "Deutsch",
      flag_code: "de",
      is_secondary: 0,
      is_add: true,
      support_google: true,
      locale: "de",
    },
    {
      name: "Spanish",
      native_name: "Español",
      flag_code: "es",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "es",
    },
    {
      name: "Chinese (Simplified)",
      native_name: "简体中文",
      flag_code: "cn",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "zh-CN",
    },
    {
      name: "Chinese (Traditional)",
      native_name: "繁體中文",
      flag_code: "tw",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "zh-TW",
    },
    {
      name: "Portuguese (Portugal)",
      native_name: "Português",
      flag_code: "pt",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "pt-PT",
    },
    {
      name: "Portuguese (Brazil)",
      native_name: "Português (Brazil)",
      flag_code: "br",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "pt-BR",
    },
    {
      name: "Russian",
      native_name: "Pусский",
      flag_code: "ru",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ru",
    },
    {
      name: "Korean",
      native_name: "한국어",
      flag_code: "kr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ko",
    },
    {
      name: "Japanese",
      native_name: "日本語",
      flag_code: "jp",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ja",
    },
    {
      name: "Swedish",
      native_name: "Svenska",
      flag_code: "se",
      is_secondary: 0,
      is_add: true,
      support_google: true,
      locale: "sv",
    },
  ],
  other_languages: [
    {
      name: "Afrikaans",
      native_name: "Afrikaans",
      flag_code: "za",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "af",
    },
    {
      name: "Akan",
      native_name: "Akan",
      flag_code: "gh",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ak",
    },
    {
      name: "Albanian",
      native_name: "Shqip",
      flag_code: "al",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sq",
    },
    {
      name: "Amharic",
      native_name: "አማርኛ",
      flag_code: "et",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "am",
    },
    {
      name: "Arabic",
      native_name: "العربية",
      flag_code: "sa",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ar",
    },
    {
      name: "Armenian",
      native_name: "հայերեն",
      flag_code: "am",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "hy",
    },
    {
      name: "Assamese",
      native_name: "অসমীয়া",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "as",
    },
    {
      name: "Azerbaijani",
      native_name: "Azərbaycanca",
      flag_code: "az",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "az",
    },
    {
      name: "Bambara",
      native_name: "Bamanankan",
      flag_code: "ml",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "bm",
    },
    {
      name: "Bangla",
      native_name: "Bangla",
      flag_code: "bd",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "bn",
    },
    {
      name: "Basque",
      native_name: "Euskara",
      flag_code: "es",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "eu",
    },
    {
      name: "Belarusian",
      native_name: "беларуская",
      flag_code: "by",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "be",
    },
    {
      name: "Bosnian",
      native_name: "Bosanski",
      flag_code: "ba",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "bs",
    },
    {
      name: "Breton",
      native_name: "Brezhoneg",
      flag_code: "bg",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "br",
    },
    {
      name: "Bulgarian",
      native_name: "български",
      flag_code: "bg",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "bg",
    },
    {
      name: "Burmese",
      native_name: "မြန်မာဘာသာ",
      flag_code: "mm",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "my",
    },
    {
      name: "Catalan",
      native_name: "Català",
      flag_code: "ca",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ca",
    },
    {
      name: "Chechen",
      native_name: "нохчийн",
      flag_code: "ru",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ce",
    },
    {
      name: "Church Slavic",
      native_name: "Church Slavic",
      flag_code: "ru",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "cu",
    },
    {
      name: "Cornish",
      native_name: "Kernowek",
      flag_code: "gb",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "kw",
    },
    {
      name: "Croatian",
      native_name: "Hrvatski",
      flag_code: "hr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "hr",
    },
    {
      name: "Czech",
      native_name: "čeština",
      flag_code: "cz",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "cs",
    },
    {
      name: "Danish",
      native_name: "Dansk",
      flag_code: "dk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "da",
    },
    {
      name: "Dzongkha",
      native_name: "ཇོང་ཁ",
      flag_code: "bt",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "dz",
    },
    {
      name: "Esperanto",
      native_name: "Esperanto",
      flag_code: "eo",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "eo",
    },
    {
      name: "Estonian",
      native_name: "Eesti",
      flag_code: "ee",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "et",
    },
    {
      name: "Ewe",
      native_name: "Eʋegbe",
      flag_code: "tg",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ee",
    },
    {
      name: "Faroese",
      native_name: "Føroyskt",
      flag_code: "fo",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "fo",
    },
    {
      name: "Finnish",
      native_name: "Suomi",
      flag_code: "fi",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "fi",
    },
    {
      name: "Filipino",
      native_name: "Filipino",
      flag_code: "ph",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "fil",
    },
    {
      name: "Fulah",
      native_name: "Fulfulde",
      flag_code: "ng",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ff",
    },
    {
      name: "Galician",
      native_name: "Galego",
      flag_code: "es",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "gl",
    },
    {
      name: "Ganda",
      native_name: "LùGáànda",
      flag_code: "ug",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "lg",
    },
    {
      name: "Georgian",
      native_name: "ქართული",
      flag_code: "ge",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ka",
    },
    {
      name: "Greek",
      native_name: "Ελληνικά",
      flag_code: "gr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "el",
    },
    {
      name: "Gujarati",
      native_name: "ગુજરાતી",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "gu",
    },
    {
      name: "Hausa",
      native_name: "(ḥawsa) حَوْسَ",
      flag_code: "ne",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ha",
    },
    {
      name: "Hebrew",
      native_name: "עברית",
      flag_code: "il",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "he",
    },
    {
      name: "Hindi",
      native_name: "हिन्दी (hindī)",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "hi",
    },
    {
      name: "Hungarian",
      native_name: "Magyar",
      flag_code: "hu",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "hu",
    },
    {
      name: "Icelandic",
      native_name: "Íslenska",
      flag_code: "is",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "is",
    },
    {
      name: "Igbo",
      native_name: "Igbo",
      flag_code: "ng",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ig",
    },
    {
      name: "Indonesian",
      native_name: "Bahasa Indonesia",
      flag_code: "id",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "id",
    },
    {
      name: "Interlingua",
      native_name: "Interlingua",
      flag_code: "ia",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ia",
    },
    {
      name: "Irish",
      native_name: "Gaeilge",
      flag_code: "ie",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ga",
    },
    {
      name: "Italian",
      native_name: "Italiano",
      flag_code: "it",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "it",
    },
    {
      name: "Javanese",
      native_name: "Jawa",
      flag_code: "id",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "jv",
    },
    {
      name: "Kalaallisut",
      native_name: "Kalaallisut",
      flag_code: "gl",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "kl",
    },
    {
      name: "Kannada",
      native_name: "ಕನ್ನಡ",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "kn",
    },
    {
      name: "Kashmiri",
      native_name: "कॉशुर",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ks",
    },
    {
      name: "Kazakh",
      native_name: "қазақша",
      flag_code: "kz",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "kk",
    },
    {
      name: "Khmer",
      native_name: "ភាសាខ្មែរ",
      flag_code: "kh",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "km",
    },
    {
      name: "Kikuyu",
      native_name: "Gĩkũyũ",
      flag_code: "ke",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ki",
    },
    {
      name: "Kinyarwanda",
      native_name: "Ikinyarwanda",
      flag_code: "rw",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "rw",
    },
    {
      name: "Kurdish",
      native_name: "kurdî",
      flag_code: "iq",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ku",
    },
    {
      name: "Kyrgyz",
      native_name: "قىرعىز",
      flag_code: "kg",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ky",
    },
    {
      name: "Lao",
      native_name: "ລາວ",
      flag_code: "la",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "lo",
    },
    {
      name: "Latvian",
      native_name: "Latviešu",
      flag_code: "lv",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "lv",
    },
    {
      name: "Lingala",
      native_name: "Lingála",
      flag_code: "cd",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ln",
    },
    {
      name: "Lithuanian",
      native_name: "Lietuvių",
      flag_code: "lt",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "lt",
    },
    {
      name: "Luba-Katanga",
      native_name: "Luba-Katanga",
      flag_code: "cd",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "lu",
    },
    {
      name: "Luxembourgish",
      native_name: "Lëtzebuergesch",
      flag_code: "lu",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "lb",
    },
    {
      name: "Macedonian",
      native_name: "македонски",
      flag_code: "mk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mk",
    },
    {
      name: "Malagasy",
      native_name: "Malagasy",
      flag_code: "mg",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mg",
    },
    {
      name: "Malay",
      native_name: "Bahasa Melayu",
      flag_code: "my",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ms",
    },
    {
      name: "Malayalam",
      native_name: "മലയാളം",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ml",
    },
    {
      name: "Maltese",
      native_name: "Malti",
      flag_code: "mt",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mt",
    },
    {
      name: "Manx",
      native_name: "Gaelg",
      flag_code: "im",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "gv",
    },
    {
      name: "Maori",
      native_name: "Māori",
      flag_code: "nz",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mi",
    },
    {
      name: "Marathi",
      native_name: "मराठी",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mr",
    },
    {
      name: "Mongolian",
      native_name: "монгол",
      flag_code: "mn",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mn",
    },
    {
      name: "Nepali",
      native_name: "नेपाली",
      flag_code: "np",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ne",
    },
    {
      name: "North Ndebele",
      native_name: "North Ndebele",
      flag_code: "zw",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "nd",
    },
    {
      name: "Northern Sami",
      native_name: "Davvisámegiella",
      flag_code: "no",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "se",
    },
    {
      name: "Norwegian (Bokmål)",
      native_name: "Norsk",
      flag_code: "no",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "nb",
    },
    {
      name: "Dutch",
      native_name: "Nederlands",
      flag_code: "nl",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "nl",
    },
    {
      name: "Norwegian",
      native_name: "Norsk",
      flag_code: "no",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "no",
    },
    {
      name: "Norwegian Nynorsk",
      native_name: "Norsk Nynorsk",
      flag_code: "no",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "nn",
    },
    {
      name: "Odia",
      native_name: "ଓଡ଼ିଆ",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "or",
    },
    {
      name: "Oromo",
      native_name: "Oromoo",
      flag_code: "et",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "om",
    },
    {
      name: "Ossetic",
      native_name: "Ирон",
      flag_code: "ru",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "os",
    },
    {
      name: "Pashto",
      native_name: "پښتو",
      flag_code: "af",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ps",
    },
    {
      name: "Persian",
      native_name: "فارسی",
      flag_code: "ir",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "fa",
    },
    {
      name: "Polish",
      native_name: "Polski",
      flag_code: "pl",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "pl",
    },
    {
      name: "Punjabi",
      native_name: "ﺎﺠﻨﭘ (panjābi)",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "pa",
    },
    {
      name: "Quechua",
      native_name: "Runa Simi",
      flag_code: "pe",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "qu",
    },
    {
      name: "Romanian",
      native_name: "Limba Română",
      flag_code: "ro",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ro",
    },
    {
      name: "Romansh",
      native_name: "Rumantsch",
      flag_code: "ch",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "rm",
    },
    {
      name: "Sango",
      native_name: "Sängö",
      flag_code: "cf",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "sg",
    },
    {
      name: "Scottish Gaelic",
      native_name: "Gàidhlig",
      flag_code: "gb-sct",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "gd",
    },
    {
      name: "Serbian",
      native_name: "Cрпски",
      flag_code: "rs",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sr",
    },
    {
      name: "Shona",
      native_name: "ChiShona",
      flag_code: "zw",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sn",
    },
    {
      name: "Sichuan Yi",
      native_name: "Sichuan Yi",
      flag_code: "cn",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ii",
    },
    {
      name: "Sindhi",
      native_name: "سنڌي",
      flag_code: "pk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sd",
    },
    {
      name: "Sinhala",
      native_name: "සිංහල",
      flag_code: "lk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "si",
    },
    {
      name: "Slovak",
      native_name: "Slovenčina",
      flag_code: "sk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sk",
    },
    {
      name: "Slovenian",
      native_name: "Slovenščina",
      flag_code: "si",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sl",
    },
    {
      name: "Somali",
      native_name: "Soomaaliga",
      flag_code: "so",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "so",
    },
    {
      name: "Swahili",
      native_name: "Kiswahili",
      flag_code: "sw",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sw",
    },
    {
      name: "Tajik",
      native_name: "тоҷики",
      flag_code: "tj",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "tg",
    },
    {
      name: "Tamil",
      native_name: "தமிழ்",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ta",
    },
    {
      name: "Tatar",
      native_name: "татарча",
      flag_code: "bg",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "tt",
    },
    {
      name: "Telugu",
      native_name: "తెలుగు",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "te",
    },
    {
      name: "Thai",
      native_name: "ไทย",
      flag_code: "th",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "th",
    },
    {
      name: "Tibetan",
      native_name: "བོད་ཡིག",
      flag_code: "cn",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "bo",
    },
    {
      name: "Tigrinya",
      native_name: "ትግርኛ",
      flag_code: "er",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "ti",
    },
    {
      name: "Tongan",
      native_name: "Faka-Tonga",
      flag_code: "to",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "to",
    },
    {
      name: "Turkmen",
      native_name: "Türkmençe",
      flag_code: "tm",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "tk",
    },
    {
      name: "Turkish",
      native_name: "Türkçe",
      flag_code: "tr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "tr",
    },
    {
      name: "Ukrainian",
      native_name: "Українська",
      flag_code: "ua",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "uk",
    },
    {
      name: "Urdu",
      native_name: "اردو",
      flag_code: "pk",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ur",
    },
    {
      name: "Uyghur",
      native_name: "ئۇيغۇرچە",
      flag_code: "cn",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ug",
    },
    {
      name: "Uzbek",
      native_name: "oʻzbekcha",
      flag_code: "uz",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "uz",
    },
    {
      name: "Vietnamese",
      native_name: "Tiếng Việt",
      flag_code: "vn",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "vi",
    },
    {
      name: "Volapük",
      native_name: "Volapük",
      flag_code: "de",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "vo",
    },
    {
      name: "Welsh",
      native_name: "Cymraeg",
      flag_code: "gb-wls",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "cy",
    },
    {
      name: "Western Frisian",
      native_name: "West-Vlams",
      flag_code: "nl",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "fy",
    },
    {
      name: "Wolof",
      native_name: "Wollof",
      flag_code: "sn",
      is_secondary: null,
      is_add: false,
      support_google: false,
      locale: "wo",
    },
    {
      name: "Xhosa",
      native_name: "IsiXhosa",
      flag_code: "za",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "xh",
    },
    {
      name: "Yiddish",
      native_name: "ייִדיש",
      flag_code: "il",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "yi",
    },
    {
      name: "Yoruba",
      native_name: "Yorùbá",
      flag_code: "ng",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "yo",
    },
    {
      name: "Zulu",
      native_name: "IsiZulu",
      flag_code: "za",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "zu",
    },
  ],
  only_basic: [
    {
      name: "Aymara",
      native_name: "Aymar aru",
      flag_code: "ay",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ay",
    },
    {
      name: "Bhojpuri",
      native_name: "भोजपुरी",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "bho",
    },
    {
      name: "Chichewa",
      native_name: "Chicheŵa",
      flag_code: "mw",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ny",
    },
    {
      name: "Cebuano",
      native_name: "Binisayâ",
      flag_code: "ph",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ceb",
    },
    {
      name: "Corsican",
      native_name: "Corsu",
      flag_code: "fr",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "co",
    },
    {
      name: "Guarani",
      native_name: "Avañe'ẽ",
      flag_code: "guarani",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "gn",
    },
    {
      name: "Haitian Creole",
      native_name: "Kreyòl ayisyen",
      flag_code: "ht",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "ht",
    },
    {
      name: "Hawaiian",
      native_name: "ʻŌlelo Hawaiʻi",
      flag_code: "ht",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "haw",
    },
    {
      name: "Myanmar (Burmese)",
      native_name: "lus Hmoob",
      flag_code: "mm",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "hmn",
    },
    {
      name: "Maithili",
      native_name: "मैथिली",
      flag_code: "in",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "mai",
    },
    {
      name: "Latin",
      native_name: "Latin",
      flag_code: "va",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "la",
    },
    {
      name: "Samoan",
      native_name: "Sāmoa",
      flag_code: "ws",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "sm",
    },
    {
      name: "Sesotho",
      native_name: "Sesotho",
      flag_code: "za",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "st",
    },
    {
      name: "Sundanese",
      native_name: "Basa Sunda",
      flag_code: "id",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "su",
    },
    {
      name: "Tagalog (Filipino)",
      native_name: "Tagalog",
      flag_code: "ph",
      is_secondary: null,
      is_add: false,
      support_google: true,
      locale: "tl",
    },
  ],
};

const store = {
  primary_locale: "de",
};
const list = {
  popular_languages: languages.popular_languages.filter(
    (l) => l.locale !== store.primary_locale
  ),
  other_languages: languages.other_languages.filter(
    (l) => l.locale !== store.primary_locale
  ),
  only_basic: languages.only_basic.filter(
    (l) => l.locale !== store.primary_locale
  ),
};

const data = [...list.popular_languages, ...list.other_languages, ...list.only_basic];

console.log(1111, data, data.length);

function displayLanguage(locale) {
  const data = languages?.other_languages
    ? [
        ...languages.other_languages,
        ...languages.popular_languages,
        ...languages.only_basic,
      ]
    : [];
  const language = data.find((item) => item.locale === locale);
  return language?.name || locale;
}

console.log(2222222, displayLanguage("en"));

const li = document.querySelectorAll("ul.Polaris-Listbox li");
console.log(2222, li, li.length);

// const listElements = [
//   {
//     element_title: "Product Name",
//     element_key: "title",
//   },
//   {
//     element_title: "Description",
//     element_key: "body_html",
//   },
//   {
//     element_title: "URL handle",
//     element_key: "handle",
//   },
//   {
//     element_title: null,
//     element_key: "product_type",
//   },
//   {
//     element_title: "Option Ships From",
//     element_key: "name",
//   },
//   {
//     element_title: "Option Color",
//     element_key: "name",
//   },
// ];

// const _subGroupProduct = [
//   {
//     id: "product",
//     title: "Product",
//     element_keys: ["title", "body_html"],
//   },
//   {
//     id: "product_options",
//     title: "Product options",
//     element_keys: ["name"],
//   },
//   {
//     id: "seo",
//     title: "SEO",
//     element_keys: ["handle", "meta_title", "meta_description"],
//   },
// ];

// function transformData(inputData, subGroups) {
//   return subGroups.map((subGroup) => {
//     const items = subGroup.element_keys.map((key) => {
//       return inputData.filter((el) => el.element_key === key);
//     });
//     return {
//       id: subGroup.id,
//       title: subGroup.title,
//       items: items.flat(Infinity),
//     };
//   });
// }

// const result = transformData(listElements, _subGroupProduct);
// console.log(result);

// const data = [
//   {
//     element_key: "title",
//   },
//   {
//     element_key: "body_html",
//   },
//   {
//     element_key: "handle",
//   },
//   {
//     element_key: 10592452641077,
//   },
//   {
//     element_key: 10592452706613,
//   },
// ];

// const dataOutput = [
//   {
//     title: "Product",
//     items: [
//       {
//         element_key: "title",
//       },
//       {
//         element_key: "body_html",
//       },
//     ],
//   },
//   {
//     title: "Product options",
//     items: [
//       {
//         element_key: 10592452641077,
//       },
//       {
//         element_key: 10592452706613,
//       },
//     ],
//   },
//   {
//     title: "SEO",
//     items: [
//       {
//         element_key: "handle",
//       },
//     ],
//   },
// ];

// const productSubGroup = [
//   {
//     title: "product",
//     element_keys: ["title", "body_html"],
//   },
//   {
//     title: "SEO",
//     element_keys: ["handle"],
//   },
//   {
//     title: "product option",
//     element_keys: [],
//   },
// ];

// const convertDataProducts = (inputData, subGroups) => {
//   const outputData = [];

//   subGroups.forEach((subGroup) => {
//     let items = [];

//     if (subGroup.element_keys.length > 0) {
//       subGroup.element_keys.forEach((key) => {
//         const matchingItem = inputData.find((item) => item.element_key === key);
//         if (matchingItem) {
//           items.push(matchingItem);
//         }
//       });
//     } else {
//       items = inputData.filter((item) => typeof item.element_key === "number");
//     }
//     outputData.push({
//       title: subGroup.title,
//       items,
//     });
//   });

//   return outputData;
// };

// const dataOutputResult = convertData(data, productSubGroup);

// console.log(dataOutputResult);

// function repeatedString(s, n) {
//   if (s === "a") return n;
//   const countA = (arr) => arr.split("").reduce((acc, curr) => {
//     if (curr.includes("a")) {
//       acc += 1
//     }
//     return acc
//   }, 0)

//   const countAinS = countA(s)
//   const loop = Math.round(n / s.length)

//   let count = countAinS * loop
//   console.log(count);
//   const floatLoop = n % s.length
//   console.log(floatLoop);
//   for (let i = 0; i < floatLoop; i++){
//     if (s[i] == "a") {
//       count++
//     }
//   }
//   return count

// }
// const n = 549382313570
// const s = "epsxyyflvrrrxzvnoenvpegvuonodjoxfwdmcvwctmekpsnamchznsoxaklzjgrqruyzavshfbmuhdwwmpbkwcuomqhiyvuztwvq"
// console.log(repeatedString(s, n));

// setTimeout(function() {
//   console.log('setTimeout');
// },0);

// setImmediate(() => {
//   console.log("setImmediate");
// })

// new Promise((resolve, reject) => {
//   resolve()
//   console.log(111);
// }).then(_ => {
//   console.log("Promise");
// })

// process.nextTick(_ => {
//   console.log("nextTick");
// })

// console.log("req.on()");

// const releaseDay = new Date("2023-11-16");
// const createAtDay = new Date("2023-07-21T06:09:30.000000Z");

// console.log(releaseDay.getTime() <= createAtDay.getTime());

// function pickingNumbers(a) {
//   return a
// }
// const a = [4, 6, 5, 3, 2];
// console.log(a);
// function findDigits(n) {
//   // Write your code here
//   const nArr = [...n.toString()]
//   let count = 0
//   nArr.forEach(i => {
//     if (n%i === 0) {
//       count++
//     }
//   })
//   return count
// }
// console.log(findDigits(10));

// function hurdleRace(k, height) {
//   // Write your code here
//   const maxHeight = Math.max(...height)
//   return maxHeight > k ? maxHeight - k : 0
// }
// const k = 4, height = [1, 6, 3, 5, 2]
// console.log(hurdleRace(k, height));

// function designerPdfViewer(h, word) {
//   const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
//   const wordArr = [...word]
//   const getheightWord = wordArr.map(w => {
//     let wIndex = alphabet.findIndex(i => i === w)
//     return +h[wIndex]
//   })
//   const maxHeight = Math.max(...getheightWord)
//   const res = maxHeight * word.length * 1
//   console.log("🚀 ~ file: shopify.js:10 ~ designerPdfViewer ~ res:", res)
//   return res
// }
// const h = "1 3 1 3 1 4 1 3 2 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 7".split(' ')
// const word = "zaba"
// console.log(h);
// console.log(designerPdfViewer(h, word));

// function catAndMouse(x, y, z) {
//   const difference = (a, b) => {
//     return Math.abs(a - b);
//   }
//   const xtoz = difference(x, z)
//   const ytoz = difference(y, z)
//   return xtoz === ytoz ? "Mouse C" : xtoz < ytoz ? "Cat A" : "Cat B"
// }
// let x =1, y=3, z=2
// console.log(catAndMouse(x, y, z));

// function getMoneySpent(keyboards, drives, b) {
//   /*
//    * Write your code here.
//    */
//   const keyboardCount = keyboards.length
//   const drivesCount = drives.length
//   const listRes = []
//   for (let i = 0; i < keyboardCount; i++){
//     for (let j = 0; j < drivesCount; j++){
//       listRes.push([keyboards[i], drives[j]])
//     }
//   }
//   const sumArr = (arr) => arr.reduce((a, b) => a + b, 0)

//   const sumRes = []
//   listRes.forEach(i => {
//     let sum = sumArr(i)
//     if (sum <= b) {
//       sumRes.push(sum)
//     }
//   })
//   return sumRes.length === 0 ? -1 : Math.max(...sumRes)
// }
// const keyboards = [3, 1], drives = [5, 2, 8], b = 10
// console.log(getMoneySpent(keyboards, drives, b));

// function pageCount(n, p) {
//   // Write your code here
//   let startCount = parseInt(p/2)
//   let endCount = (n%2 ===0) ? parseInt((n-p+1)/2) : parseInt((n-p)/2)
//   return startCount <= endCount ? startCount : endCount
// }
// const n = 5, p = 4;
// console.log(pageCount(n, p));

// function sockMerchant(n, ar) {
//   // Write your code here
//   const countPerType = ar.reduce((acc, curr) => {
//     if (!acc[curr]) {
//       acc[curr] = 1
//     } else {
//       acc[curr] += 1
//     }
//     return acc
//   }, {})

//   let res = 0;
//   Object.values(countPerType).forEach(i => {
//     if (i>=2) {
//       res += parseInt(i/2)
//     }
//   })
//   return res;
// }
// const ar = [10, 20, 20, 10, 10, 30, 50, 10, 20], n = 9
// console.log(sockMerchant(n, ar));

// function bonAppetit(bill, k, b) {
//     // Write your code here
//   bill.splice(k, 1)
//   const sumArr = arr => arr.reduce((a, b) => a + b, 0)
//   const priceMustPay = sumArr(bill) / 2
//   if (priceMustPay === b) {
//     console.log("Bon Appetit");
//   } else {
//     console.log(b - priceMustPay);
//   }
// }
// const bill = [3, 10, 2, 9], k = 1, b = 7;
// console.log(bonAppetit(bill, k, b));

// function dayOfProgrammer(year) {
//   if(year == 1918) return "26.09.1918"
//   let leapYear
//   // Write your code here
//   if (year < 1917) {
//     leapYear = year % 4 === 0
//   } else {
//     leapYear = (year % 4 === 0) && (year % 100 != 0) || year % 400 == 0
//   }

//   return leapYear ? `12.09.${year}` : `13.09.${year}`;
// }
// console.log(dayOfProgrammer(2023));
// function migratoryBirds(arr) {
//   // Write your code here
//   const birdObj = arr.reduce((acc, cur) => {
//     if (!acc[cur]) {
//       acc[cur] = 1;
//     } else {
//       acc[cur]++;
//     }
//     return acc;
//   }, {});
//   const max = Math.max(...Object.values(birdObj));
//   const valueMax = Object.entries(birdObj).filter((i) => i[1] === max);
//   const min = Math.min(...Object.values(valueMax).map((e) => e[0]));
//   return min;
// }
// const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4];
// console.log(migratoryBirds(arr));
// function divisibleSumPairs(n, k, arr) {
//   // Write your code here
//   const sum = arr => arr.reduce((a, b) => a + b, 0)
//   let count = 0
//   for (let i = 0; i < n; i++){
//     for (let j = 1; j < n; j++){
//       const a = [arr[i], arr[j]]
//       if (i >= j) continue;
//       if (sum(a) % k === 0) {
//         console.log(i, j, a);
//         count++
//       }
//     }
//   }
//   return count
// }
// const k = 3
// const ar = [1, 3, 2, 6, 1, 2]
// console.log(divisibleSumPairs(ar.length, k, ar));
// function birthday(s, d, m) {
//   // Write your code here
//   const sum = arr => arr.reduce((a, b) => a + b, 0)
//   let count = 0
//   for (let i in s) {
//     let a = s.slice(+i, +i + +m)
//     if (a.length == m && sum(a) == d) {
//       count++
//     }

//   }
//   return count
// }
// const s = [1, 2, 1, 3, 2]
// const d = 3
// const m = 2
// console.log(birthday(s, d, m));
// function breakingRecords(scores) {
//   // Write your code here
//   const arrMin = []
//   const arrMax = []
//   let min = 0, max = 0
//   for (let i in scores) {
//     if (i == 0) {
//       arrMin.push(scores[i])
//       arrMax.push(scores[i])
//     } else {
//       if (arrMin[i - 1] <= scores[i]) {
//         arrMin.push(arrMin[i - 1])
//       } else {
//         min++
//         arrMin.push(scores[i])
//       }
//       if (arrMax[i - 1] >= scores[i]) {
//         arrMax.push(arrMax[i - 1])
//       } else {
//         max++
//         arrMax.push(scores[i])
//       }
//     }
//   }
//   return [max, min]
// }

// const scores = [12, 24, 10, 24]
// console.log(breakingRecords(scores));

// function kangaroo(x1, v1, x2, v2) {
//   // Write your code here
//   if (x1 < x2 && v1 < v2 || x1 > x2 && v1 > v2 || x1 != x2 && v1 == v2 || x1 == x2 && v1 != v2) {
//     return "NO";
//   }
//   let newX1 = x1 + v1
//   let newX2 = x2 + v2
//   console.log(newX1, newX2);
//   if (newX1 === newX2) {
//     return "YES";
//   } else {
//     return kangaroo(newX1, v1, newX2, v2)
//   }
// }
// console.log(kangaroo(21, 6, 47, 3));
// function countApplesAndOranges(s, t, a, b, apples, oranges) {
//   // Write your code here
//   let countApple = 0
//   let countOrange = 0
//   for (let apple of apples) {
//     let position = apple + a
//     if (position >= s && position <= t) {
//       countApple++
//     }
//   }
//   for (let orange of oranges) {
//     let position = orange + b
//     if (position >= s && position <= t) {
//       countOrange++
//     }
//   }
//   console.log(`${countApple}\n${countOrange}`);
// }
// countApplesAndOranges(7, 11, 5,15, [-2, 2, 1], [5, -6])

// console.log(gradingStudents(7, 11, 5,15, [-2, 2, 1], [5, -6]));

// function gradingStudents(grades) {
//   // Write your code here
//   const gradeFormat = []
//   for (let grade of grades) {
//     console.log(grade);
//     if (grade < 38) {
//       gradeFormat.push(grade)
//       continue;
//     }
//     const boiso = grade % 5
//     if (boiso >= 3) {
//       gradeFormat.push(grade + (5 - boiso))
//       continue;
//     }
//     gradeFormat.push(grade)
//   }
//   return gradeFormat
// }
// console.log(gradingStudents([33, 38, 67, 73]));

/*
44: 4
43: 3
42: 2

46:1
47:2
48:3
49:4
*/

// const s = `07:05:45PM`;
// function timeConversion(s) {
//   // Write your code here
//   let hour = s.slice(0, 2);
//   let minute = s.slice(3, 5);
//   let second = s.slice(6, 8);
//   const timeString = s.slice(-2);
//   console.log(hour, minute, second, timeString);
//   if (timeString == "AM") {
//     if (hour == "12") {
//       hour = "00"
//     }
//   } else {
//     if (hour == "12") {
//       hour = "12"
//     } else {
//       hour = +hour + 12
//     }
//   }
//   return `${hour}:${minute}:${second}`
// }
// console.log(timeConversion(s));
