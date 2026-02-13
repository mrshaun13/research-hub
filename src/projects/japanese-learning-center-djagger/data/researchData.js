// Japanese Learning Center — Vocabulary, Particles, Grammar, Sources

export const particles = [
  { particle: 'は (wa)', name: 'Topic Marker', level: 'N5', usages: [
    { meaning: 'Marks the topic of the sentence', structure: '[Topic] は [Comment]', examples: [
      { jp: 'わたし は がくせい です。', romaji: 'Watashi wa gakusei desu.', en: 'I am a student.' },
      { jp: 'きょう は あつい です。', romaji: 'Kyou wa atsui desu.', en: 'Today is hot.' },
    ]},
    { meaning: 'Contrast — "this one, as opposed to others"', structure: '[A] は ... [B] は ...', examples: [
      { jp: 'にく は たべます が、さかな は たべません。', romaji: 'Niku wa tabemasu ga, sakana wa tabemasen.', en: 'I eat meat, but I don\'t eat fish.' },
    ]},
  ]},
  { particle: 'が (ga)', name: 'Subject Marker', level: 'N5', usages: [
    { meaning: 'Marks the grammatical subject', structure: '[Subject] が [Verb/Adj]', examples: [
      { jp: 'あめ が ふっています。', romaji: 'Ame ga futte imasu.', en: 'Rain is falling.' },
      { jp: 'だれ が きましたか。', romaji: 'Dare ga kimashita ka.', en: 'Who came?' },
    ]},
    { meaning: 'Used with すき, ほしい, わかる, できる', structure: '[Object] が すき/ほしい/わかる', examples: [
      { jp: 'すし が すき です。', romaji: 'Sushi ga suki desu.', en: 'I like sushi.' },
      { jp: 'にほんご が わかります。', romaji: 'Nihongo ga wakarimasu.', en: 'I understand Japanese.' },
    ]},
    { meaning: '"but" — connecting clauses', structure: '[A] が、[B]', examples: [
      { jp: 'いきたい です が、じかん が ありません。', romaji: 'Ikitai desu ga, jikan ga arimasen.', en: 'I want to go, but I don\'t have time.' },
    ]},
  ]},
  { particle: 'を (wo/o)', name: 'Object Marker', level: 'N5', usages: [
    { meaning: 'Marks the direct object of a verb', structure: '[Object] を [Verb]', examples: [
      { jp: 'ほん を よみます。', romaji: 'Hon wo yomimasu.', en: 'I read a book.' },
      { jp: 'みず を のみます。', romaji: 'Mizu wo nomimasu.', en: 'I drink water.' },
    ]},
    { meaning: 'Place of movement through/along', structure: '[Place] を [Movement Verb]', examples: [
      { jp: 'こうえん を あるきます。', romaji: 'Kouen wo arukimasu.', en: 'I walk through the park.' },
    ]},
  ]},
  { particle: 'に (ni)', name: 'Target / Location / Time', level: 'N5', usages: [
    { meaning: 'Direction/destination', structure: '[Place] に いく/くる', examples: [
      { jp: 'がっこう に いきます。', romaji: 'Gakkou ni ikimasu.', en: 'I go to school.' },
    ]},
    { meaning: 'Location of existence (with いる/ある)', structure: '[Place] に いる/ある', examples: [
      { jp: 'ねこ が いえ に います。', romaji: 'Neko ga ie ni imasu.', en: 'The cat is in the house.' },
    ]},
    { meaning: 'Specific time marker', structure: '[Time] に [Verb]', examples: [
      { jp: 'しちじ に おきます。', romaji: 'Shichiji ni okimasu.', en: 'I wake up at 7.' },
    ]},
    { meaning: 'Indirect object (to/for someone)', structure: '[Person] に [Verb]', examples: [
      { jp: 'ともだち に てがみ を かきます。', romaji: 'Tomodachi ni tegami wo kakimasu.', en: 'I write a letter to my friend.' },
    ]},
  ]},
  { particle: 'で (de)', name: 'Means / Location of Action', level: 'N5', usages: [
    { meaning: 'Location where an action takes place', structure: '[Place] で [Action]', examples: [
      { jp: 'としょかん で べんきょう します。', romaji: 'Toshokan de benkyou shimasu.', en: 'I study at the library.' },
    ]},
    { meaning: 'Means/tool used', structure: '[Means] で [Verb]', examples: [
      { jp: 'はし で たべます。', romaji: 'Hashi de tabemasu.', en: 'I eat with chopsticks.' },
      { jp: 'でんしゃ で いきます。', romaji: 'Densha de ikimasu.', en: 'I go by train.' },
    ]},
    { meaning: 'Reason/cause', structure: '[Reason] で', examples: [
      { jp: 'びょうき で やすみました。', romaji: 'Byouki de yasumimashita.', en: 'I was absent due to illness.' },
    ]},
  ]},
  { particle: 'の (no)', name: 'Possessive / Modifier', level: 'N5', usages: [
    { meaning: 'Possession — "\'s" or "of"', structure: '[Owner] の [Thing]', examples: [
      { jp: 'わたし の ほん', romaji: 'Watashi no hon', en: 'My book' },
      { jp: 'にほん の たべもの', romaji: 'Nihon no tabemono', en: 'Japanese food' },
    ]},
    { meaning: 'Nominalizer — turns clause into noun', structure: '[Verb] の が すき', examples: [
      { jp: 'うたう の が すき です。', romaji: 'Utau no ga suki desu.', en: 'I like singing.' },
    ]},
  ]},
  { particle: 'と (to)', name: 'And / With / Quotation', level: 'N5', usages: [
    { meaning: '"And" — exhaustive list', structure: '[A] と [B]', examples: [
      { jp: 'りんご と みかん を かいました。', romaji: 'Ringo to mikan wo kaimashita.', en: 'I bought apples and oranges.' },
    ]},
    { meaning: '"With" — together', structure: '[Person] と [Verb]', examples: [
      { jp: 'ともだち と えいが を みました。', romaji: 'Tomodachi to eiga wo mimashita.', en: 'I watched a movie with my friend.' },
    ]},
    { meaning: 'Quotation — "that"', structure: '... と おもいます', examples: [
      { jp: 'あした あめ だ と おもいます。', romaji: 'Ashita ame da to omoimasu.', en: 'I think it will rain tomorrow.' },
    ]},
  ]},
  { particle: 'も (mo)', name: 'Also / Too', level: 'N5', usages: [
    { meaning: '"Also" / "too" — replaces は, が, を', structure: '[Noun] も', examples: [
      { jp: 'わたし も がくせい です。', romaji: 'Watashi mo gakusei desu.', en: 'I am also a student.' },
    ]},
  ]},
  { particle: 'か (ka)', name: 'Question', level: 'N5', usages: [
    { meaning: 'Turns statement into question', structure: '[Statement] か', examples: [
      { jp: 'にほんじん です か。', romaji: 'Nihonjin desu ka.', en: 'Are you Japanese?' },
    ]},
    { meaning: '"Or" — between options', structure: '[A] か [B]', examples: [
      { jp: 'コーヒー か おちゃ、どちら が いい です か。', romaji: 'Koohii ka ocha, dochira ga ii desu ka.', en: 'Coffee or tea, which is better?' },
    ]},
  ]},
  { particle: 'から (kara)', name: 'From / Because', level: 'N5', usages: [
    { meaning: '"From" — starting point', structure: '[Point] から', examples: [
      { jp: 'くじ から ごじ まで はたらきます。', romaji: 'Kuji kara goji made hatarakimasu.', en: 'I work from 9 to 5.' },
    ]},
    { meaning: '"Because" — reason', structure: '[Reason] から', examples: [
      { jp: 'あつい から、まど を あけましょう。', romaji: 'Atsui kara, mado wo akemashou.', en: 'Because it\'s hot, let\'s open the window.' },
    ]},
  ]},
  { particle: 'まで (made)', name: 'Until / As far as', level: 'N5', usages: [
    { meaning: '"Until" / "up to"', structure: '[Point] まで', examples: [
      { jp: 'さんじ まで まちます。', romaji: 'Sanji made machimasu.', en: 'I\'ll wait until 3.' },
    ]},
  ]},
  { particle: 'へ (e)', name: 'Direction', level: 'N5', usages: [
    { meaning: 'Direction of movement', structure: '[Place] へ いく', examples: [
      { jp: 'にほん へ いきたい です。', romaji: 'Nihon e ikitai desu.', en: 'I want to go to Japan.' },
    ]},
  ]},
  { particle: 'よ (yo)', name: 'Emphasis', level: 'N5', usages: [
    { meaning: 'Adds emphasis — "I tell you"', structure: '[Statement] よ', examples: [
      { jp: 'これ は おいしい です よ。', romaji: 'Kore wa oishii desu yo.', en: 'This is delicious, you know!' },
    ]},
  ]},
  { particle: 'ね (ne)', name: 'Confirmation', level: 'N5', usages: [
    { meaning: 'Seeking agreement — "right?"', structure: '[Statement] ね', examples: [
      { jp: 'いい てんき です ね。', romaji: 'Ii tenki desu ne.', en: 'Nice weather, isn\'t it?' },
    ]},
  ]},
  { particle: 'や (ya)', name: 'Non-exhaustive List', level: 'N5', usages: [
    { meaning: '"Things like" — non-exhaustive', structure: '[A] や [B] (など)', examples: [
      { jp: 'りんご や みかん など を かいました。', romaji: 'Ringo ya mikan nado wo kaimashita.', en: 'I bought things like apples and oranges.' },
    ]},
  ]},
  { particle: 'より (yori)', name: 'Comparison', level: 'N4', usages: [
    { meaning: '"Than"', structure: '[A] より [B] の ほう が [Adj]', examples: [
      { jp: 'なつ より ふゆ の ほう が すき です。', romaji: 'Natsu yori fuyu no hou ga suki desu.', en: 'I like winter more than summer.' },
    ]},
  ]},
  { particle: 'ので (node)', name: 'Because (polite)', level: 'N4', usages: [
    { meaning: '"Because" — softer than から', structure: '[Reason] ので', examples: [
      { jp: 'あめ が ふっている ので、かさ を もっていきます。', romaji: 'Ame ga futte iru node, kasa wo motte ikimasu.', en: 'Because it\'s raining, I\'ll take an umbrella.' },
    ]},
  ]},
  { particle: 'のに (noni)', name: 'Despite', level: 'N3', usages: [
    { meaning: '"Even though" — frustration/surprise', structure: '[A] のに、[B]', examples: [
      { jp: 'べんきょう した のに、しけん に おちました。', romaji: 'Benkyou shita noni, shiken ni ochimashita.', en: 'Even though I studied, I failed.' },
    ]},
  ]},
  { particle: 'しか (shika)', name: 'Only (negative)', level: 'N4', usages: [
    { meaning: '"Only" — with negative verb', structure: '[Noun] しか [Neg Verb]', examples: [
      { jp: 'みず しか のみません。', romaji: 'Mizu shika nomimasen.', en: 'I drink only water.' },
    ]},
  ]},
  { particle: 'ばかり (bakari)', name: 'Only / Just', level: 'N3', usages: [
    { meaning: '"Nothing but" / "just did"', structure: '[Verb た] ばかり', examples: [
      { jp: 'いま きた ばかり です。', romaji: 'Ima kita bakari desu.', en: 'I just arrived.' },
    ]},
  ]},
];

export const grammarPoints = [
  { id: 1, level: 'N5', grammar: 'です / だ', meaning: 'To be (copula)', structure: '[Noun/Adj] です', examples: [{ jp: 'がくせい です。', romaji: 'Gakusei desu.', en: 'I am a student.' }] },
  { id: 2, level: 'N5', grammar: 'じゃない', meaning: 'Is not', structure: '[Noun] じゃない', examples: [{ jp: 'せんせい じゃない です。', romaji: 'Sensei janai desu.', en: 'I am not a teacher.' }] },
  { id: 3, level: 'N5', grammar: '～ます / ～ません', meaning: 'Polite present/negative', structure: '[Verb stem] ます', examples: [{ jp: 'たべます / たべません', romaji: 'Tabemasu / Tabemasen', en: 'I eat / I don\'t eat' }] },
  { id: 4, level: 'N5', grammar: '～ました', meaning: 'Polite past', structure: '[Verb stem] ました', examples: [{ jp: 'いきました。', romaji: 'Ikimashita.', en: 'I went.' }] },
  { id: 5, level: 'N5', grammar: '～たい', meaning: 'Want to do', structure: '[Verb stem] たい', examples: [{ jp: 'にほん に いきたい です。', romaji: 'Nihon ni ikitai desu.', en: 'I want to go to Japan.' }] },
  { id: 6, level: 'N5', grammar: 'が ほしい', meaning: 'Want something', structure: '[Noun] が ほしい', examples: [{ jp: 'くるま が ほしい です。', romaji: 'Kuruma ga hoshii desu.', en: 'I want a car.' }] },
  { id: 7, level: 'N5', grammar: 'が ある / いる', meaning: 'There is/exists', structure: '[Thing] が ある / いる', examples: [{ jp: 'ねこ が います。', romaji: 'Neko ga imasu.', en: 'There is a cat.' }] },
  { id: 8, level: 'N5', grammar: 'い-adjective', meaning: 'i-adj conjugation', structure: '～い → ～くない / ～かった', examples: [{ jp: 'おおきい → おおきくない → おおきかった', romaji: 'ookii → ookikunai → ookikatta', en: 'big → not big → was big' }] },
  { id: 9, level: 'N5', grammar: 'な-adjective', meaning: 'na-adj conjugation', structure: '～ → ～じゃない / ～だった', examples: [{ jp: 'しずか → しずかじゃない → しずかだった', romaji: 'shizuka → shizuka janai → shizuka datta', en: 'quiet → not quiet → was quiet' }] },
  { id: 10, level: 'N5', grammar: 'ましょう', meaning: 'Let\'s do', structure: '[Verb stem] ましょう', examples: [{ jp: 'たべましょう。', romaji: 'Tabemashou.', en: 'Let\'s eat.' }] },
  { id: 11, level: 'N5', grammar: 'てください', meaning: 'Please do', structure: '[Verb て] ください', examples: [{ jp: 'まって ください。', romaji: 'Matte kudasai.', en: 'Please wait.' }] },
  { id: 12, level: 'N5', grammar: 'ないでください', meaning: 'Please don\'t', structure: '[Verb ない] で ください', examples: [{ jp: 'さわらないで ください。', romaji: 'Sawaranaide kudasai.', en: 'Please don\'t touch.' }] },
  { id: 13, level: 'N5', grammar: 'ほうがいい', meaning: 'Had better', structure: '[Verb た] ほうがいい', examples: [{ jp: 'はやく ねた ほうがいい。', romaji: 'Hayaku neta hou ga ii.', en: 'You should sleep early.' }] },
  { id: 14, level: 'N5', grammar: 'まえに', meaning: 'Before', structure: '[Verb dict.] まえに', examples: [{ jp: 'ねる まえに は を みがきます。', romaji: 'Neru mae ni ha wo migakimasu.', en: 'I brush teeth before sleeping.' }] },
  { id: 15, level: 'N5', grammar: 'あとで', meaning: 'After', structure: '[Verb た] あとで', examples: [{ jp: 'たべた あとで さんぽ します。', romaji: 'Tabeta ato de sanpo shimasu.', en: 'After eating, I take a walk.' }] },
  { id: 16, level: 'N5', grammar: 'ながら', meaning: 'While doing', structure: '[Verb stem] ながら', examples: [{ jp: 'おんがく を ききながら べんきょう します。', romaji: 'Ongaku wo kikinagara benkyou shimasu.', en: 'I study while listening to music.' }] },
  { id: 17, level: 'N4', grammar: 'ている', meaning: 'Ongoing/state', structure: '[Verb て] いる', examples: [{ jp: 'べんきょう しています。', romaji: 'Benkyou shite imasu.', en: 'I am studying.' }] },
  { id: 18, level: 'N4', grammar: 'てから', meaning: 'After doing', structure: '[Verb て] から', examples: [{ jp: 'シャワー を あびてから たべます。', romaji: 'Shawaa wo abite kara tabemasu.', en: 'After showering, I eat.' }] },
  { id: 19, level: 'N4', grammar: 'たら', meaning: 'If/When', structure: '[Verb た] ら', examples: [{ jp: 'あめ が ふったら いえ に います。', romaji: 'Ame ga futtara ie ni imasu.', en: 'If it rains, I\'ll stay home.' }] },
  { id: 20, level: 'N4', grammar: 'ば', meaning: 'If (conditional)', structure: '[Verb ば form]', examples: [{ jp: 'やすければ かいます。', romaji: 'Yasukereba kaimasu.', en: 'If it\'s cheap, I\'ll buy it.' }] },
  { id: 21, level: 'N4', grammar: 'Potential form', meaning: 'Can do', structure: 'Godan: ～える / Ichidan: ～られる', examples: [{ jp: 'にほんご が はなせます。', romaji: 'Nihongo ga hanasemasu.', en: 'I can speak Japanese.' }] },
  { id: 22, level: 'N4', grammar: 'てもいい', meaning: 'May / It\'s okay to', structure: '[Verb て] もいい', examples: [{ jp: 'すわっても いい です か。', romaji: 'Suwatte mo ii desu ka.', en: 'May I sit?' }] },
  { id: 23, level: 'N4', grammar: 'てはいけない', meaning: 'Must not', structure: '[Verb て] はいけない', examples: [{ jp: 'ここ で たべては いけません。', romaji: 'Koko de tabete wa ikemasen.', en: 'You must not eat here.' }] },
  { id: 24, level: 'N4', grammar: 'なければならない', meaning: 'Must / Have to', structure: '[Verb ない stem] なければならない', examples: [{ jp: 'しゅくだい を しなければ なりません。', romaji: 'Shukudai wo shinakereba narimasen.', en: 'I must do homework.' }] },
  { id: 25, level: 'N4', grammar: 'あげる/くれる/もらう', meaning: 'Giving/receiving', structure: '[Person] に あげる/くれる/もらう', examples: [{ jp: 'ともだち に プレゼント を あげました。', romaji: 'Tomodachi ni purezento wo agemashita.', en: 'I gave a present to my friend.' }] },
  { id: 26, level: 'N4', grammar: 'てしまう', meaning: 'Completely / Unfortunately', structure: '[Verb て] しまう', examples: [{ jp: 'ぜんぶ たべて しまいました。', romaji: 'Zenbu tabete shimaimashita.', en: 'I ate it all (oops).' }] },
  { id: 27, level: 'N4', grammar: 'そうだ (appearance)', meaning: 'Looks like', structure: '[Adj stem] そうだ', examples: [{ jp: 'おいしそう です。', romaji: 'Oishisou desu.', en: 'It looks delicious.' }] },
  { id: 28, level: 'N4', grammar: 'すぎる', meaning: 'Too much', structure: '[Verb/Adj stem] すぎる', examples: [{ jp: 'たべすぎました。', romaji: 'Tabesugimashita.', en: 'I ate too much.' }] },
  { id: 29, level: 'N3', grammar: 'Passive form', meaning: 'To be done', structure: 'Godan: ～あれる / Ichidan: ～られる', examples: [{ jp: 'あし を ふまれました。', romaji: 'Ashi wo fumaremashita.', en: 'My foot was stepped on.' }] },
  { id: 30, level: 'N3', grammar: 'Causative form', meaning: 'Make/let do', structure: 'Godan: ～あせる / Ichidan: ～させる', examples: [{ jp: 'やさい を たべさせました。', romaji: 'Yasai wo tabesasemashita.', en: 'I made them eat vegetables.' }] },
  { id: 31, level: 'N3', grammar: 'ために', meaning: 'In order to', structure: '[Verb dict.] ために', examples: [{ jp: 'けんこう の ために うんどう します。', romaji: 'Kenkou no tame ni undou shimasu.', en: 'I exercise for my health.' }] },
  { id: 32, level: 'N3', grammar: 'ことがある', meaning: 'Have experienced', structure: '[Verb た] ことがある', examples: [{ jp: 'にほん に いった ことが あります。', romaji: 'Nihon ni itta koto ga arimasu.', en: 'I have been to Japan.' }] },
  { id: 33, level: 'N3', grammar: 'ことにする', meaning: 'Decide to', structure: '[Verb dict.] ことにする', examples: [{ jp: 'にほん に いく ことにしました。', romaji: 'Nihon ni iku koto ni shimashita.', en: 'I decided to go to Japan.' }] },
  { id: 34, level: 'N3', grammar: 'そうだ (hearsay)', meaning: 'I heard that', structure: '[Plain] そうだ', examples: [{ jp: 'あめ が ふる そうです。', romaji: 'Ame ga furu sou desu.', en: 'I heard it will rain.' }] },
  { id: 35, level: 'N3', grammar: 'ようだ', meaning: 'It seems', structure: '[Plain] ようだ', examples: [{ jp: 'びょうき の ようです。', romaji: 'Byouki no you desu.', en: 'It seems like illness.' }] },
  { id: 36, level: 'N3', grammar: 'らしい', meaning: 'Apparently', structure: '[Plain] らしい', examples: [{ jp: 'おいしい らしい です。', romaji: 'Oishii rashii desu.', en: 'Apparently it\'s delicious.' }] },
  { id: 37, level: 'N3', grammar: 'ば～ほど', meaning: 'The more... the more', structure: '[Verb ば] [Verb] ほど', examples: [{ jp: 'べんきょう すれば するほど おもしろい。', romaji: 'Benkyou sureba suru hodo omoshiroi.', en: 'The more you study, the more interesting it gets.' }] },
  { id: 38, level: 'N2', grammar: 'にもかかわらず', meaning: 'Despite', structure: '[Plain] にもかかわらず', examples: [{ jp: 'あめ にもかかわらず しあい は おこなわれました。', romaji: 'Ame ni mo kakawarazu shiai wa okonawaremashita.', en: 'Despite rain, the game was held.' }] },
  { id: 39, level: 'N2', grammar: 'わけがない', meaning: 'No way that', structure: '[Plain] わけがない', examples: [{ jp: 'うそ を つく わけがない。', romaji: 'Uso wo tsuku wake ga nai.', en: 'There\'s no way he\'d lie.' }] },
  { id: 40, level: 'N2', grammar: 'うちに', meaning: 'While / Before change', structure: '[Verb/ない] うちに', examples: [{ jp: 'わすれない うちに メモ します。', romaji: 'Wasurenai uchi ni memo shimasu.', en: 'I\'ll note it before I forget.' }] },
  { id: 41, level: 'N1', grammar: 'がゆえに', meaning: 'Precisely because', structure: '[Plain] がゆえに', examples: [{ jp: 'まじめ がゆえに ストレス が たまる。', romaji: 'Majime ga yue ni sutoresu ga tamaru.', en: 'Precisely because of seriousness, stress builds.' }] },
  { id: 42, level: 'N1', grammar: 'ずにはいられない', meaning: 'Can\'t help but', structure: '[Verb ない stem] ずにはいられない', examples: [{ jp: 'わらわずにはいられなかった。', romaji: 'Warawazu ni wa irarenakatta.', en: 'I couldn\'t help but laugh.' }] },
  { id: 43, level: 'N1', grammar: 'にほかならない', meaning: 'Nothing but', structure: '[Noun] にほかならない', examples: [{ jp: 'どりょく の けっか にほかならない。', romaji: 'Doryoku no kekka ni hoka naranai.', en: 'It\'s nothing but the result of effort.' }] },
];

export const vocabularyCategories = [
  { category: 'Greetings & Basics', icon: 'Hand', level: 'N5', words: [
    { jp: 'おはよう ございます', romaji: 'ohayou gozaimasu', en: 'Good morning (polite)' },
    { jp: 'こんにちは', romaji: 'konnichiwa', en: 'Hello / Good afternoon' },
    { jp: 'こんばんは', romaji: 'konbanwa', en: 'Good evening' },
    { jp: 'さようなら', romaji: 'sayounara', en: 'Goodbye' },
    { jp: 'ありがとう ございます', romaji: 'arigatou gozaimasu', en: 'Thank you (polite)' },
    { jp: 'すみません', romaji: 'sumimasen', en: 'Excuse me / Sorry' },
    { jp: 'おねがいします', romaji: 'onegai shimasu', en: 'Please' },
    { jp: 'はい / いいえ', romaji: 'hai / iie', en: 'Yes / No' },
    { jp: 'おやすみなさい', romaji: 'oyasuminasai', en: 'Good night' },
    { jp: 'いただきます', romaji: 'itadakimasu', en: 'Before eating (humble)' },
    { jp: 'ごちそうさまでした', romaji: 'gochisousama deshita', en: 'After eating (thanks)' },
    { jp: 'おげんき です か', romaji: 'ogenki desu ka', en: 'How are you?' },
  ]},
  { category: 'People & Family', icon: 'Users', level: 'N5', words: [
    { jp: 'ひと', romaji: 'hito', en: 'Person' },
    { jp: 'おとこ の ひと', romaji: 'otoko no hito', en: 'Man' },
    { jp: 'おんな の ひと', romaji: 'onna no hito', en: 'Woman' },
    { jp: 'こども', romaji: 'kodomo', en: 'Child' },
    { jp: 'ちち / おとうさん', romaji: 'chichi / otousan', en: 'Father (my / your)' },
    { jp: 'はは / おかあさん', romaji: 'haha / okaasan', en: 'Mother (my / your)' },
    { jp: 'あに / おにいさん', romaji: 'ani / oniisan', en: 'Older brother' },
    { jp: 'あね / おねえさん', romaji: 'ane / oneesan', en: 'Older sister' },
    { jp: 'おとうと', romaji: 'otouto', en: 'Younger brother' },
    { jp: 'いもうと', romaji: 'imouto', en: 'Younger sister' },
    { jp: 'ともだち', romaji: 'tomodachi', en: 'Friend' },
    { jp: 'せんせい', romaji: 'sensei', en: 'Teacher' },
  ]},
  { category: 'Food & Drink', icon: 'UtensilsCrossed', level: 'N5', words: [
    { jp: 'ごはん', romaji: 'gohan', en: 'Rice / Meal' },
    { jp: 'パン', romaji: 'pan', en: 'Bread' },
    { jp: 'にく', romaji: 'niku', en: 'Meat' },
    { jp: 'さかな', romaji: 'sakana', en: 'Fish' },
    { jp: 'やさい', romaji: 'yasai', en: 'Vegetables' },
    { jp: 'くだもの', romaji: 'kudamono', en: 'Fruit' },
    { jp: 'たまご', romaji: 'tamago', en: 'Egg' },
    { jp: 'みず', romaji: 'mizu', en: 'Water' },
    { jp: 'おちゃ', romaji: 'ocha', en: 'Tea' },
    { jp: 'コーヒー', romaji: 'koohii', en: 'Coffee' },
    { jp: 'ビール', romaji: 'biiru', en: 'Beer' },
    { jp: 'すし', romaji: 'sushi', en: 'Sushi' },
    { jp: 'ラーメン', romaji: 'raamen', en: 'Ramen' },
    { jp: 'おいしい', romaji: 'oishii', en: 'Delicious' },
  ]},
  { category: 'Places & Travel', icon: 'MapPin', level: 'N5', words: [
    { jp: 'えき', romaji: 'eki', en: 'Station' },
    { jp: 'がっこう', romaji: 'gakkou', en: 'School' },
    { jp: 'びょういん', romaji: 'byouin', en: 'Hospital' },
    { jp: 'ぎんこう', romaji: 'ginkou', en: 'Bank' },
    { jp: 'ゆうびんきょく', romaji: 'yuubinkyoku', en: 'Post office' },
    { jp: 'レストラン', romaji: 'resutoran', en: 'Restaurant' },
    { jp: 'ホテル', romaji: 'hoteru', en: 'Hotel' },
    { jp: 'くうこう', romaji: 'kuukou', en: 'Airport' },
    { jp: 'こうえん', romaji: 'kouen', en: 'Park' },
    { jp: 'デパート', romaji: 'depaato', en: 'Department store' },
    { jp: 'コンビニ', romaji: 'konbini', en: 'Convenience store' },
    { jp: 'としょかん', romaji: 'toshokan', en: 'Library' },
  ]},
  { category: 'Time & Days', icon: 'Clock', level: 'N5', words: [
    { jp: 'きょう', romaji: 'kyou', en: 'Today' },
    { jp: 'あした', romaji: 'ashita', en: 'Tomorrow' },
    { jp: 'きのう', romaji: 'kinou', en: 'Yesterday' },
    { jp: 'いま', romaji: 'ima', en: 'Now' },
    { jp: 'あさ', romaji: 'asa', en: 'Morning' },
    { jp: 'ひる', romaji: 'hiru', en: 'Noon' },
    { jp: 'よる', romaji: 'yoru', en: 'Night' },
    { jp: 'まいにち', romaji: 'mainichi', en: 'Every day' },
    { jp: 'しゅうまつ', romaji: 'shuumatsu', en: 'Weekend' },
    { jp: 'げつようび', romaji: 'getsuyoubi', en: 'Monday' },
    { jp: 'にちようび', romaji: 'nichiyoubi', en: 'Sunday' },
  ]},
  { category: 'Common Adjectives', icon: 'Palette', level: 'N5', words: [
    { jp: 'おおきい', romaji: 'ookii', en: 'Big' },
    { jp: 'ちいさい', romaji: 'chiisai', en: 'Small' },
    { jp: 'たかい', romaji: 'takai', en: 'Expensive / Tall' },
    { jp: 'やすい', romaji: 'yasui', en: 'Cheap' },
    { jp: 'あたらしい', romaji: 'atarashii', en: 'New' },
    { jp: 'ふるい', romaji: 'furui', en: 'Old (things)' },
    { jp: 'いい / よい', romaji: 'ii / yoi', en: 'Good' },
    { jp: 'わるい', romaji: 'warui', en: 'Bad' },
    { jp: 'むずかしい', romaji: 'muzukashii', en: 'Difficult' },
    { jp: 'かんたん', romaji: 'kantan', en: 'Easy / Simple' },
    { jp: 'きれい', romaji: 'kirei', en: 'Pretty / Clean' },
    { jp: 'げんき', romaji: 'genki', en: 'Energetic / Well' },
  ]},
  { category: 'Common Verbs', icon: 'Zap', level: 'N5', words: [
    { jp: 'たべる', romaji: 'taberu', en: 'To eat' },
    { jp: 'のむ', romaji: 'nomu', en: 'To drink' },
    { jp: 'いく', romaji: 'iku', en: 'To go' },
    { jp: 'くる', romaji: 'kuru', en: 'To come' },
    { jp: 'する', romaji: 'suru', en: 'To do' },
    { jp: 'みる', romaji: 'miru', en: 'To see / watch' },
    { jp: 'きく', romaji: 'kiku', en: 'To listen / ask' },
    { jp: 'はなす', romaji: 'hanasu', en: 'To speak' },
    { jp: 'よむ', romaji: 'yomu', en: 'To read' },
    { jp: 'かく', romaji: 'kaku', en: 'To write' },
    { jp: 'かう', romaji: 'kau', en: 'To buy' },
    { jp: 'ねる', romaji: 'neru', en: 'To sleep' },
    { jp: 'おきる', romaji: 'okiru', en: 'To wake up' },
    { jp: 'あるく', romaji: 'aruku', en: 'To walk' },
  ]},
  { category: 'Nature & Weather', icon: 'Cloud', level: 'N5', words: [
    { jp: 'てんき', romaji: 'tenki', en: 'Weather' },
    { jp: 'あめ', romaji: 'ame', en: 'Rain' },
    { jp: 'ゆき', romaji: 'yuki', en: 'Snow' },
    { jp: 'かぜ', romaji: 'kaze', en: 'Wind' },
    { jp: 'そら', romaji: 'sora', en: 'Sky' },
    { jp: 'やま', romaji: 'yama', en: 'Mountain' },
    { jp: 'うみ', romaji: 'umi', en: 'Sea / Ocean' },
    { jp: 'かわ', romaji: 'kawa', en: 'River' },
    { jp: 'はな', romaji: 'hana', en: 'Flower' },
    { jp: 'き', romaji: 'ki', en: 'Tree' },
  ]},
];

export const sources = [
  { id: 1, title: 'JLPT Sensei — Grammar Lists N5-N1', url: 'https://jlptsensei.com/', type: 'Grammar Reference', tier: 'T1' },
  { id: 2, title: 'Tofugu — Japanese Verb Conjugation Groups', url: 'https://www.tofugu.com/japanese-grammar/verb-conjugation-groups/', type: 'Grammar Guide', tier: 'T1' },
  { id: 3, title: 'Migaku — JLPT Grammar Points Complete Guide', url: 'https://migaku.com/blog/japanese/jlpt-grammar-points', type: 'Grammar Reference', tier: 'T2' },
  { id: 4, title: 'Genki Textbook Series (3rd Edition)', url: 'https://genki3.japantimes.co.jp/', type: 'Textbook', tier: 'T1' },
  { id: 5, title: 'Tae Kim\'s Guide to Learning Japanese', url: 'https://guidetojapanese.org/learn/', type: 'Free Online Guide', tier: 'T2' },
  { id: 6, title: 'JLPT Official — Level Summary', url: 'https://www.jlpt.jp/e/about/levelsummary.html', type: 'Official Standard', tier: 'T1' },
  { id: 7, title: 'JapanesePod101 — Particles Guide', url: 'https://www.japanesepod101.com/japanese-particles/', type: 'Learning Platform', tier: 'T2' },
  { id: 8, title: 'Wasabi Japan — Keigo Guide', url: 'https://wasabi-jpn.com/magazine/japanese-lessons/the-honorific-form-the-humble-form-and-the-polite-form/', type: 'Grammar Guide', tier: 'T2' },
  { id: 9, title: 'Imabi — Advanced Japanese Grammar', url: 'https://www.imabi.net/', type: 'Advanced Reference', tier: 'T2' },
  { id: 10, title: 'NHK World — Easy Japanese', url: 'https://www.nhk.or.jp/lesson/en/', type: 'Free Course', tier: 'T1' },
  { id: 11, title: 'Minna no Nihongo Textbook Series', url: 'https://www.3anet.co.jp/np/en/list.html', type: 'Textbook', tier: 'T1' },
  { id: 12, title: 'WaniKani — Kanji & Vocabulary', url: 'https://www.wanikani.com/', type: 'SRS Learning Tool', tier: 'T2' },
];
