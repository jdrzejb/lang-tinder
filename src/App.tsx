import "./App.css";

type Country = {
  id: string;
  name: string;
  flag: string;
};

const countries: Array<Country> = [
  { id: "AF", name: "Afganistan", flag: "🇦🇫" },
  { id: "AL", name: "Albania", flag: "🇦🇱" },
  { id: "DZ", name: "Algieria", flag: "🇩🇿" },
  { id: "AS", name: "Samoa Amerykańskie", flag: "🇦🇸" },
  { id: "AD", name: "Andora", flag: "🇦🇩" },
  { id: "AO", name: "Angola", flag: "🇦🇴" },
  { id: "AI", name: "Anguilla", flag: "🇦🇮" },
  { id: "AQ", name: "Antarktyda", flag: "🇦🇶" },
  { id: "AG", name: "Antigua i Barbuda", flag: "🇦🇬" },
  { id: "AR", name: "Argentyna", flag: "🇦🇷" },
  { id: "AM", name: "Armenia", flag: "🇦🇲" },
  { id: "AW", name: "Aruba", flag: "🇦🇼" },
  { id: "AU", name: "Australia", flag: "🇦🇺" },
  { id: "AT", name: "Austria", flag: "🇦🇹" },
  { id: "AZ", name: "Azerbejdżan", flag: "🇦🇿" },
  { id: "BS", name: "Bahamy", flag: "🇧🇸" },
  { id: "BH", name: "Bahrajn", flag: "🇧🇭" },
  { id: "BD", name: "Bangladesz", flag: "🇧🇩" },
  { id: "BB", name: "Barbados", flag: "🇧🇧" },
  { id: "BY", name: "Białoruś", flag: "🇧🇾" },
  { id: "BE", name: "Belgia", flag: "🇧🇪" },
  { id: "BZ", name: "Belize", flag: "🇧🇿" },
  { id: "BJ", name: "Benin", flag: "🇧🇯" },
  { id: "BM", name: "Bermudy", flag: "🇧🇲" },
  { id: "BT", name: "Bhutan", flag: "🇧🇹" },
  { id: "BO", name: "Boliwia", flag: "🇧🇴" },
  { id: "BA", name: "Bośnia i Hercegowina", flag: "🇧🇦" },
  { id: "BW", name: "Botswana", flag: "🇧🇼" },
  { id: "BR", name: "Brazylia", flag: "🇧🇷" },
  { id: "IO", name: "Brytyjskie Terytorium Oceanu Indyjskiego", flag: "🇮🇴" },
  { id: "BN", name: "Brunei", flag: "🇧🇳" },
  { id: "BG", name: "Bułgaria", flag: "🇧🇬" },
  { id: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { id: "BI", name: "Burundi", flag: "🇧🇮" },
  { id: "CV", name: "Republika Zielonego Przylądka", flag: "🇨🇻" },
  { id: "KH", name: "Kambodża", flag: "🇰🇭" },
  { id: "CM", name: "Kamerun", flag: "🇨🇲" },
  { id: "CA", name: "Kanada", flag: "🇨🇦" },
  { id: "KY", name: "Kajmany", flag: "🇰🇾" },
  { id: "CF", name: "Republika Środkowoafrykańska", flag: "🇨🇫" },
  { id: "TD", name: "Czad", flag: "🇹🇩" },
  { id: "CL", name: "Chile", flag: "🇨🇱" },
  { id: "CN", name: "Chiny", flag: "🇨🇳" },
  { id: "CO", name: "Kolumbia", flag: "🇨🇴" },
  { id: "KM", name: "Komory", flag: "🇰🇲" },
  { id: "CD", name: "Demokratyczna Republika Konga", flag: "🇨🇩" },
  { id: "CG", name: "Republika Konga", flag: "🇨🇬" },
  { id: "CR", name: "Kostaryka", flag: "🇨🇷" },
  { id: "CI", name: "Wybrzeże Kości Słoniowej", flag: "🇨🇮" },
  { id: "HR", name: "Chorwacja", flag: "🇭🇷" },
  { id: "CU", name: "Kuba", flag: "🇨🇺" },
  { id: "CY", name: "Cypr", flag: "🇨🇾" },
  { id: "CZ", name: "Czechy", flag: "🇨🇿" },
  { id: "DK", name: "Dania", flag: "🇩🇰" },
  { id: "DJ", name: "Dżibuti", flag: "🇩🇯" },
  { id: "DM", name: "Dominika", flag: "🇩🇲" },
  { id: "DO", name: "Dominikana", flag: "🇩🇴" },
  { id: "EC", name: "Ekwador", flag: "🇪🇨" },
  { id: "EG", name: "Egipt", flag: "🇪🇬" },
  { id: "SV", name: "Salwador", flag: "🇸🇻" },
  { id: "GQ", name: "Gwinea Równikowa", flag: "🇬🇶" },
  { id: "ER", name: "Erytrea", flag: "🇪🇷" },
  { id: "EE", name: "Estonia", flag: "🇪🇪" },
  { id: "ET", name: "Etiopia", flag: "🇪🇹" },
  { id: "FJ", name: "Fidżi", flag: "🇫🇯" },
  { id: "FI", name: "Finlandia", flag: "🇫🇮" },
  { id: "FR", name: "Francja", flag: "🇫🇷" },
  { id: "GA", name: "Gabon", flag: "🇬🇦" },
  { id: "GM", name: "Gambia", flag: "🇬🇲" },
  { id: "GE", name: "Gruzja", flag: "🇬🇪" },
  { id: "DE", name: "Niemcy", flag: "🇩🇪" },
  { id: "GH", name: "Ghana", flag: "🇬🇭" },
  { id: "GR", name: "Grecja", flag: "🇬🇷" },
  { id: "GD", name: "Grenada", flag: "🇬🇩" },
  { id: "GT", name: "Gwatemala", flag: "🇬🇹" },
  { id: "GN", name: "Gwinea", flag: "🇬🇳" },
  { id: "GW", name: "Gwinea Bissau", flag: "🇬🇼" },
  { id: "GY", name: "Gujana", flag: "🇬🇾" },
  { id: "HT", name: "Haiti", flag: "🇭🇹" },
  { id: "HN", name: "Honduras", flag: "🇭🇳" },
  { id: "HU", name: "Węgry", flag: "🇭🇺" },
  { id: "IS", name: "Islandia", flag: "🇮🇸" },
  { id: "IN", name: "Indie", flag: "🇮🇳" },
  { id: "ID", name: "Indonezja", flag: "🇮🇩" },
  { id: "IR", name: "Iran", flag: "🇮🇷" },
  { id: "IQ", name: "Irak", flag: "🇮🇶" },
  { id: "IE", name: "Irlandia", flag: "🇮🇪" },
  { id: "IL", name: "Izrael", flag: "🇮🇱" },
  { id: "IT", name: "Włochy", flag: "🇮🇹" },
  { id: "JM", name: "Jamajka", flag: "🇯🇲" },
  { id: "JP", name: "Japonia", flag: "🇯🇵" },
  { id: "JO", name: "Jordania", flag: "🇯🇴" },
  { id: "KZ", name: "Kazachstan", flag: "🇰🇿" },
  { id: "KE", name: "Kenia", flag: "🇰🇪" },
  { id: "KI", name: "Kiribati", flag: "🇰🇮" },
  { id: "KP", name: "Korea Północna", flag: "🇰🇵" },
  { id: "KR", name: "Korea Południowa", flag: "🇰🇷" },
  { id: "KW", name: "Kuwejt", flag: "🇰🇼" },
  { id: "KG", name: "Kirgistan", flag: "🇰🇬" },
  { id: "LA", name: "Laos", flag: "🇱🇦" },
  { id: "LV", name: "Łotwa", flag: "🇱🇻" },
  { id: "LB", name: "Liban", flag: "🇱🇧" },
  { id: "LS", name: "Lesotho", flag: "🇱🇸" },
  { id: "LR", name: "Liberia", flag: "🇱🇷" },
  { id: "LY", name: "Libia", flag: "🇱🇾" },
  { id: "LI", name: "Liechtenstein", flag: "🇱🇮" },
  { id: "LT", name: "Litwa", flag: "🇱🇹" },
  { id: "LU", name: "Luksemburg", flag: "🇱🇺" },
  { id: "MK", name: "Macedonia Północna", flag: "🇲🇰" },
  { id: "MG", name: "Madagaskar", flag: "🇲🇬" },
  { id: "MW", name: "Malawi", flag: "🇲🇼" },
  { id: "MY", name: "Malezja", flag: "🇲🇾" },
  { id: "MV", name: "Malediwy", flag: "🇲🇻" },
  { id: "ML", name: "Mali", flag: "🇲🇱" },
  { id: "MT", name: "Malta", flag: "🇲🇹" },
  { id: "MH", name: "Wyspy Marshalla", flag: "🇲🇭" },
  { id: "MQ", name: "Martynika", flag: "🇲🇶" },
  { id: "MR", name: "Mauretania", flag: "🇲🇷" },
  { id: "MU", name: "Mauritius", flag: "🇲🇺" },
  { id: "YT", name: "Majotta", flag: "🇾🇹" },
  { id: "MX", name: "Meksyk", flag: "🇲🇽" },
  { id: "FM", name: "Mikronezja", flag: "🇫🇲" },
  { id: "MD", name: "Mołdawia", flag: "🇲🇩" },
  { id: "MC", name: "Monako", flag: "🇲🇨" },
  { id: "MN", name: "Mongolia", flag: "🇲🇳" },
  { id: "ME", name: "Czarnogóra", flag: "🇲🇪" },
  { id: "MS", name: "Montserrat", flag: "🇲🇸" },
  { id: "MA", name: "Maroko", flag: "🇲🇦" },
  { id: "MZ", name: "Mozambik", flag: "🇲🇿" },
  { id: "MM", name: "Mjanma (Birma)", flag: "🇲🇲" },
  { id: "NA", name: "Namibia", flag: "🇳🇦" },
  { id: "NR", name: "Nauru", flag: "🇳🇷" },
  { id: "NP", name: "Nepal", flag: "🇳🇵" },
  { id: "NL", name: "Holandia", flag: "🇳🇱" },
  { id: "NZ", name: "Nowa Zelandia", flag: "🇳🇿" },
  { id: "NI", name: "Nikaragua", flag: "🇳🇮" },
  { id: "NE", name: "Niger", flag: "🇳🇪" },
  { id: "NG", name: "Nigeria", flag: "🇳🇬" },
  { id: "NU", name: "Niue", flag: "🇳🇺" },
  { id: "NF", name: "Norfolk", flag: "🇳🇫" },
  { id: "MP", name: "Mariany Północne", flag: "🇲🇵" },
  { id: "NO", name: "Norwegia", flag: "🇳🇴" },
  { id: "OM", name: "Oman", flag: "🇴🇲" },
  { id: "PK", name: "Pakistan", flag: "🇵🇰" },
  { id: "PW", name: "Palau", flag: "🇵🇼" },
  { id: "PS", name: "Palestyna", flag: "🇵🇸" },
  { id: "PA", name: "Panama", flag: "🇵🇦" },
  { id: "PG", name: "Papua-Nowa Gwinea", flag: "🇵🇬" },
  { id: "PY", name: "Paragwaj", flag: "🇵🇾" },
  { id: "PE", name: "Peru", flag: "🇵🇪" },
  { id: "PH", name: "Filipiny", flag: "🇵🇭" },
  { id: "PL", name: "Polska", flag: "🇵🇱" },
  { id: "PT", name: "Portugalia", flag: "🇵🇹" },
  { id: "QA", name: "Katar", flag: "🇶🇦" },
  { id: "RO", name: "Rumunia", flag: "🇷🇴" },
  { id: "RU", name: "Rosja", flag: "🇷🇺" },
  { id: "RW", name: "Rwanda", flag: "🇷🇼" },
  { id: "KN", name: "Saint Kitts i Nevis", flag: "🇰🇳" },
  { id: "LC", name: "Saint Lucia", flag: "🇱🇨" },
  { id: "VC", name: "Saint Vincent i Grenadyny", flag: "🇻🇨" },
  { id: "WS", name: "Samoa", flag: "🇼🇸" },
  { id: "SM", name: "San Marino", flag: "🇸🇲" },
  { id: "ST", name: "Wyspy Świętego Tomasza i Książęca", flag: "🇸🇹" },
  { id: "SA", name: "Arabia Saudyjska", flag: "🇸🇦" },
  { id: "SN", name: "Senegal", flag: "🇸🇳" },
  { id: "RS", name: "Serbia", flag: "🇷🇸" },
  { id: "SC", name: "Seszele", flag: "🇸🇨" },
  { id: "SL", name: "Sierra Leone", flag: "🇸🇱" },
  { id: "SG", name: "Singapur", flag: "🇸🇬" },
  { id: "SK", name: "Słowacja", flag: "🇸🇰" },
  { id: "SI", name: "Słowenia", flag: "🇸🇮" },
  { id: "SB", name: "Wyspy Salomona", flag: "🇸🇧" },
  { id: "SO", name: "Somalia", flag: "🇸🇴" },
  { id: "ZA", name: "Republika Południowej Afryki", flag: "🇿🇦" },
  { id: "SS", name: "Sudan Południowy", flag: "🇸🇸" },
  { id: "ES", name: "Hiszpania", flag: "🇪🇸" },
  { id: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { id: "SD", name: "Sudan", flag: "🇸🇩" },
  { id: "SR", name: "Surinam", flag: "🇸🇷" },
  { id: "SZ", name: "Eswatini", flag: "🇸🇿" },
  { id: "SE", name: "Szwecja", flag: "🇸🇪" },
  { id: "CH", name: "Szwajcaria", flag: "🇨🇭" },
  { id: "SY", name: "Syria", flag: "🇸🇾" },
  { id: "TW", name: "Tajwan", flag: "🇹🇼" },
  { id: "TJ", name: "Tadżykistan", flag: "🇹🇯" },
  { id: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { id: "TH", name: "Tajlandia", flag: "🇹🇭" },
  { id: "TL", name: "Timor Wschodni", flag: "🇹🇱" },
  { id: "TG", name: "Togo", flag: "🇹🇬" },
  { id: "TO", name: "Tonga", flag: "🇹🇴" },
  { id: "TT", name: "Trynidad i Tobago", flag: "🇹🇹" },
  { id: "TN", name: "Tunezja", flag: "🇹🇳" },
  { id: "TR", name: "Turcja", flag: "🇹🇷" },
  { id: "TM", name: "Turkmenistan", flag: "🇹🇲" },
  { id: "TC", name: "Turks i Caicos", flag: "🇹🇨" },
  { id: "TV", name: "Tuvalu", flag: "🇹🇻" },
  { id: "UG", name: "Uganda", flag: "🇺🇬" },
  { id: "UA", name: "Ukraina", flag: "🇺🇦" },
  { id: "AE", name: "Zjednoczone Emiraty Arabskie", flag: "🇦🇪" },
  { id: "GB", name: "Wielka Brytania", flag: "🇬🇧" },
  { id: "US", name: "Stany Zjednoczone", flag: "🇺🇸" },
  { id: "UY", name: "Urugwaj", flag: "🇺🇾" },
  { id: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
  { id: "VU", name: "Vanuatu", flag: "🇻🇺" },
  { id: "VA", name: "Watykan", flag: "🇻🇦" },
  { id: "VE", name: "Wenezuela", flag: "🇻🇪" },
  { id: "VN", name: "Wietnam", flag: "🇻🇳" },
  { id: "YE", name: "Jemen", flag: "🇾🇪" },
  { id: "ZM", name: "Zambia", flag: "🇿🇲" },
  { id: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
];

function App() {
  function speakText(text: string) {
    if (!text) return;

    // Check if the browser supports the Web Speech API
    if ("speechSynthesis" in window) {
      // Create a new instance of SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Optional: Set the language (e.g., 'en-US')
      utterance.lang = "pl-PL";

      // Optional: Set other properties
      utterance.pitch = 1; // Range: 0 to 2
      utterance.rate = 1; // Range: 0.1 to 10
      utterance.volume = 1; // Range: 0 to 1
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      alert(
        "Sorry, your browser does not support text-to-speech functionality."
      );
    }
  }
  return (
    <>
      {countries.map((i) => {
        return (
          <div
            onClick={() => speakText(i.name)}
            style={{
              background: "#eee",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <div>{i.name}</div>
            <div style={{ fontSize: "90px" }}>{i.flag}</div>
          </div>
        );
      })}
    </>
  );
}

export default App;
