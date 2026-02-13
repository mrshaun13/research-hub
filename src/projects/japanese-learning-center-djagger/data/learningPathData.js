// Japanese Learning Path — Guided Curriculum from Beginner to Advanced
export const learningPath = [
  {
    level: 'Beginner',
    jlpt: 'N5',
    color: 'emerald',
    description: 'Build your foundation — writing systems, basic grammar, essential vocabulary, and simple conversations.',
    units: [
      {
        title: 'Unit 1: The Japanese Writing Systems',
        lessons: [
          {
            title: 'Introduction to Japanese',
            content: `Japanese uses three writing systems: hiragana, katakana, and kanji. In this course, we focus on hiragana and katakana (with romaji support) — these two systems cover all the sounds in Japanese.

**Hiragana** (ひらがな) is used for native Japanese words and grammatical elements. It has 46 basic characters.
**Katakana** (カタカナ) is used for foreign loanwords, onomatopoeia, and emphasis. It also has 46 basic characters.
**Romaji** is the romanized spelling of Japanese sounds using the Latin alphabet.

Japanese sentences are structured as Subject-Object-Verb (SOV), unlike English (SVO).
  English: I eat sushi.
  Japanese: わたし は すし を たべます。(Watashi wa sushi wo tabemasu.)
  Literally: I [topic] sushi [object] eat.`,
            examples: [
              { jp: 'わたし は にほんじん です。', romaji: 'Watashi wa nihonjin desu.', en: 'I am Japanese.' },
              { jp: 'これ は ほん です。', romaji: 'Kore wa hon desu.', en: 'This is a book.' },
            ],
          },
          {
            title: 'Hiragana: Vowels & K-row',
            content: `Start with the 5 vowels — every Japanese sound is built on these:

あ (a) — like "ah" in "father"
い (i) — like "ee" in "feet"
う (u) — like "oo" in "food" but shorter, lips not rounded
え (e) — like "e" in "pet"
お (o) — like "o" in "go"

K-row adds a "k" consonant before each vowel:
か (ka), き (ki), く (ku), け (ke), こ (ko)

Practice: Read these words aloud:
  あい (ai) — love
  いけ (ike) — pond
  かき (kaki) — persimmon / oyster
  あおい (aoi) — blue
  おおきい (ookii) — big`,
            examples: [
              { jp: 'あか', romaji: 'aka', en: 'red' },
              { jp: 'いえ', romaji: 'ie', en: 'house' },
              { jp: 'えき', romaji: 'eki', en: 'station' },
              { jp: 'かお', romaji: 'kao', en: 'face' },
            ],
          },
          {
            title: 'Hiragana: S, T, N rows',
            content: `S-row: さ (sa), し (shi*), す (su), せ (se), そ (so)
*Note: し is "shi" not "si" — this is an important exception.

T-row: た (ta), ち (chi*), つ (tsu*), て (te), と (to)
*Note: ち is "chi" not "ti", and つ is "tsu" not "tu".

N-row: な (na), に (ni), ぬ (nu), ね (ne), の (no)

Practice words:
  さかな (sakana) — fish
  しかし (shikashi) — however
  つき (tsuki) — moon
  ちかてつ (chikatetsu) — subway
  なつ (natsu) — summer`,
            examples: [
              { jp: 'さくら', romaji: 'sakura', en: 'cherry blossom' },
              { jp: 'たなか', romaji: 'Tanaka', en: '(surname) Tanaka' },
              { jp: 'ねこ', romaji: 'neko', en: 'cat' },
            ],
          },
          {
            title: 'Hiragana: H, M, Y, R, W rows & N',
            content: `H-row: は (ha), ひ (hi), ふ (fu*), へ (he), ほ (ho)
*Note: ふ is "fu" — the lips are close but don't touch (not like English "f").
*Special: は is read "wa" when used as the topic particle. へ is read "e" when used as the direction particle.

M-row: ま (ma), み (mi), む (mu), め (me), も (mo)
Y-row: や (ya), ゆ (yu), よ (yo) — only 3 characters
R-row: ら (ra), り (ri), る (ru), れ (re), ろ (ro)
*Note: Japanese "r" is a light tap, between English "r" and "l".

W-row: わ (wa), を (wo/o) — only 2 characters
*を is almost exclusively used as the object particle.

ん (n) — the only consonant that stands alone.

You now know all 46 basic hiragana!`,
            examples: [
              { jp: 'はな', romaji: 'hana', en: 'flower / nose' },
              { jp: 'やま', romaji: 'yama', en: 'mountain' },
              { jp: 'みず', romaji: 'mizu', en: 'water' },
              { jp: 'ほん を よむ', romaji: 'hon wo yomu', en: 'to read a book' },
            ],
          },
          {
            title: 'Dakuten & Handakuten',
            content: `Adding two small marks (゛dakuten) or a small circle (゜handakuten) to certain characters changes their sound:

Dakuten (゛) — voiced sounds:
  か → が (ka → ga), き → ぎ (ki → gi), く → ぐ (ku → gu), け → げ (ke → ge), こ → ご (ko → go)
  さ → ざ (sa → za), し → じ (shi → ji), す → ず (su → zu), せ → ぜ (se → ze), そ → ぞ (so → zo)
  た → だ (ta → da), ち → ぢ (chi → di*), つ → づ (tsu → du*), て → で (te → de), と → ど (to → do)
  は → ば (ha → ba), ひ → び (hi → bi), ふ → ぶ (fu → bu), へ → べ (he → be), ほ → ぼ (ho → bo)
*ぢ and づ are rare; じ and ず are used instead in most cases.

Handakuten (゜) — "p" sounds (only h-row):
  は → ぱ (ha → pa), ひ → ぴ (hi → pi), ふ → ぷ (fu → pu), へ → ぺ (he → pe), ほ → ぽ (ho → po)`,
            examples: [
              { jp: 'がっこう', romaji: 'gakkou', en: 'school' },
              { jp: 'でんわ', romaji: 'denwa', en: 'telephone' },
              { jp: 'てんぷら', romaji: 'tenpura', en: 'tempura' },
            ],
          },
          {
            title: 'Combination Sounds (Youon)',
            content: `Combine an i-column character with a small や, ゆ, or よ to create new sounds:

きゃ (kya), きゅ (kyu), きょ (kyo)
しゃ (sha), しゅ (shu), しょ (sho)
ちゃ (cha), ちゅ (chu), ちょ (cho)
にゃ (nya), にゅ (nyu), にょ (nyo)
ひゃ (hya), ひゅ (hyu), ひょ (hyo)
みゃ (mya), みゅ (myu), みょ (myo)
りゃ (rya), りゅ (ryu), りょ (ryo)

With dakuten: ぎゃ (gya), じゃ (ja), びゃ (bya), ぴゃ (pya), etc.

Special sounds:
  Small っ (double consonant): きって (kitte) — stamp, がっこう (gakkou) — school
  Long vowels: おかあさん (okaasan) — mother, おにいさん (oniisan) — older brother`,
            examples: [
              { jp: 'きょう', romaji: 'kyou', en: 'today' },
              { jp: 'しゃしん', romaji: 'shashin', en: 'photograph' },
              { jp: 'ちょっと', romaji: 'chotto', en: 'a little' },
              { jp: 'りょこう', romaji: 'ryokou', en: 'travel' },
            ],
          },
          {
            title: 'Katakana Basics',
            content: `Katakana represents the same sounds as hiragana but is used for:
1. Foreign loanwords (mostly from English): コーヒー (koohii) — coffee
2. Foreign names: アメリカ (Amerika) — America
3. Onomatopoeia: ワンワン (wanwan) — woof woof
4. Emphasis (like italics in English)

Katakana has the same 46 base characters, dakuten, and combos as hiragana.
The characters look more angular compared to hiragana's rounded shapes.

Long vowels in katakana use ー (a dash): ケーキ (keeki) — cake

Common katakana words you already know:
  テレビ (terebi) — TV
  パソコン (pasokon) — personal computer
  レストラン (resutoran) — restaurant
  ホテル (hoteru) — hotel
  タクシー (takushii) — taxi
  ビール (biiru) — beer
  アイスクリーム (aisukuriimu) — ice cream`,
            examples: [
              { jp: 'コンビニ', romaji: 'konbini', en: 'convenience store' },
              { jp: 'スマートフォン', romaji: 'sumaatofon', en: 'smartphone' },
              { jp: 'チョコレート', romaji: 'chokoreeto', en: 'chocolate' },
            ],
          },
        ],
      },
      {
        title: 'Unit 2: Basic Grammar & Sentences',
        lessons: [
          {
            title: 'です (desu) — The Copula',
            content: `です (desu) is the polite form of "to be" (am, is, are). It comes at the end of a sentence.

Structure: [A] は [B] です。 — A is B.
Negative: [A] は [B] じゃないです / ではありません。 — A is not B.
Past: [A] は [B] でした。 — A was B.
Past negative: [A] は [B] じゃなかったです。 — A was not B.

The casual form is だ (da), but beginners should use です.`,
            examples: [
              { jp: 'わたし は がくせい です。', romaji: 'Watashi wa gakusei desu.', en: 'I am a student.' },
              { jp: 'これ は ペン です。', romaji: 'Kore wa pen desu.', en: 'This is a pen.' },
              { jp: 'あれ は びょういん じゃないです。', romaji: 'Are wa byouin janai desu.', en: 'That is not a hospital.' },
              { jp: 'きのう は にちようび でした。', romaji: 'Kinou wa nichiyoubi deshita.', en: 'Yesterday was Sunday.' },
            ],
          },
          {
            title: 'Basic Particles: は, が, を, に, で',
            content: `Particles are small words that mark the grammatical role of each word in a sentence. They are the backbone of Japanese grammar.

は (wa) — Topic marker: "As for [topic]..."
  わたし は せんせい です。 (Watashi wa sensei desu.) — I am a teacher.

が (ga) — Subject marker: marks who/what does the action
  あめ が ふっています。 (Ame ga futte imasu.) — It is raining.

を (wo) — Object marker: marks what the verb acts on
  パン を たべます。 (Pan wo tabemasu.) — I eat bread.

に (ni) — Target/time/location of existence
  がっこう に いきます。 (Gakkou ni ikimasu.) — I go to school.
  さんじ に あいましょう。 (Sanji ni aimashou.) — Let's meet at 3.

で (de) — Location of action / means
  としょかん で べんきょう します。 (Toshokan de benkyou shimasu.) — I study at the library.
  はし で たべます。 (Hashi de tabemasu.) — I eat with chopsticks.`,
            examples: [
              { jp: 'わたし は まいにち コーヒー を のみます。', romaji: 'Watashi wa mainichi koohii wo nomimasu.', en: 'I drink coffee every day.' },
              { jp: 'ともだち が にほん に います。', romaji: 'Tomodachi ga Nihon ni imasu.', en: 'My friend is in Japan.' },
              { jp: 'でんしゃ で かいしゃ に いきます。', romaji: 'Densha de kaisha ni ikimasu.', en: 'I go to the company by train.' },
            ],
          },
          {
            title: 'Verb Basics: ます Form',
            content: `Japanese verbs come at the END of the sentence. The ます (masu) form is the standard polite form.

Present/Future: ～ます (tabemasu — I eat / will eat)
Negative: ～ません (tabemasen — I don't eat)
Past: ～ました (tabemashita — I ate)
Past negative: ～ませんでした (tabemasen deshita — I didn't eat)

Common verbs in ます form:
  たべます (tabemasu) — eat
  のみます (nomimasu) — drink
  いきます (ikimasu) — go
  きます (kimasu) — come
  します (shimasu) — do
  みます (mimasu) — see/watch
  ききます (kikimasu) — listen/ask
  よみます (yomimasu) — read
  かきます (kakimasu) — write
  はなします (hanashimasu) — speak`,
            examples: [
              { jp: 'まいにち にほんご を べんきょう します。', romaji: 'Mainichi nihongo wo benkyou shimasu.', en: 'I study Japanese every day.' },
              { jp: 'きのう えいが を みました。', romaji: 'Kinou eiga wo mimashita.', en: 'I watched a movie yesterday.' },
              { jp: 'あした がっこう に いきません。', romaji: 'Ashita gakkou ni ikimasen.', en: 'I won\'t go to school tomorrow.' },
            ],
          },
          {
            title: 'Adjectives: い and な',
            content: `Japanese has two types of adjectives:

**い-adjectives** end in い and conjugate directly:
  おおきい (ookii) — big
  Negative: おおきくない (ookikunai) — not big
  Past: おおきかった (ookikatta) — was big
  Past neg: おおきくなかった (ookikunakatta) — was not big

**な-adjectives** use な before nouns and conjugate like nouns:
  しずか (shizuka) — quiet → しずかな まち (shizuka na machi) — quiet town
  Negative: しずかじゃない (shizuka janai) — not quiet
  Past: しずかだった (shizuka datta) — was quiet

Common い-adjectives: おいしい (oishii, delicious), たかい (takai, expensive/tall), やすい (yasui, cheap), あたらしい (atarashii, new), ふるい (furui, old)
Common な-adjectives: げんき (genki, energetic), すき (suki, liked), きれい (kirei, pretty/clean), べんり (benri, convenient), ゆうめい (yuumei, famous)

Exception: いい (ii, good) → よくない (yokunai, not good) → よかった (yokatta, was good)`,
            examples: [
              { jp: 'この ラーメン は おいしい です。', romaji: 'Kono raamen wa oishii desu.', en: 'This ramen is delicious.' },
              { jp: 'あの こうえん は しずかな ところ です。', romaji: 'Ano kouen wa shizuka na tokoro desu.', en: 'That park is a quiet place.' },
              { jp: 'きのう の テスト は むずかしくなかった です。', romaji: 'Kinou no tesuto wa muzukashikunakatta desu.', en: 'Yesterday\'s test was not difficult.' },
            ],
          },
          {
            title: 'Questions & Demonstratives',
            content: `**Questions** — add か (ka) to the end of a statement:
  にほんじん です か。 (Nihonjin desu ka.) — Are you Japanese?

**Question words:**
  なに / なん (nani/nan) — what
  だれ (dare) — who
  どこ (doko) — where
  いつ (itsu) — when
  なぜ / どうして (naze/doushite) — why
  どう (dou) — how
  いくら (ikura) — how much
  いくつ (ikutsu) — how many

**Demonstratives (ko-so-a-do):**
  これ (kore) — this (near me)
  それ (sore) — that (near you)
  あれ (are) — that over there
  どれ (dore) — which one?

  この (kono) + noun — this [noun]
  その (sono) + noun — that [noun]
  あの (ano) + noun — that [noun] over there
  どの (dono) + noun — which [noun]?

  ここ (koko) — here
  そこ (soko) — there
  あそこ (asoko) — over there
  どこ (doko) — where?`,
            examples: [
              { jp: 'これ は なん です か。', romaji: 'Kore wa nan desu ka.', en: 'What is this?' },
              { jp: 'トイレ は どこ です か。', romaji: 'Toire wa doko desu ka.', en: 'Where is the toilet?' },
              { jp: 'この ほん は いくら です か。', romaji: 'Kono hon wa ikura desu ka.', en: 'How much is this book?' },
              { jp: 'あの ひと は だれ です か。', romaji: 'Ano hito wa dare desu ka.', en: 'Who is that person?' },
            ],
          },
          {
            title: 'Counting & Numbers',
            content: `Japanese numbers 1-10:
  いち (1), に (2), さん (3), よん/し (4), ご (5)
  ろく (6), なな/しち (7), はち (8), きゅう/く (9), じゅう (10)

Tens: じゅう (10), にじゅう (20), さんじゅう (30)...
Hundreds: ひゃく (100), にひゃく (200), さんびゃく (300)...
Thousands: せん (1000), にせん (2000), さんぜん (3000)...

**Counters** — Japanese uses special counter words:
  ～にん (nin) — people: ひとり (1), ふたり (2), さんにん (3)...
  ～つ (tsu) — general objects: ひとつ (1), ふたつ (2), みっつ (3)...
  ～まい (mai) — flat things (paper, tickets)
  ～ほん/ぽん/ぼん (hon) — long things (pens, bottles)
  ～ひき/ぴき/びき (hiki) — small animals
  ～だい (dai) — machines, vehicles
  ～さつ (satsu) — books

Time: ～じ (ji) for hours, ～ふん/ぷん (fun/pun) for minutes
  いちじ (1:00), にじ (2:00), さんじ (3:00)
  ごふん (5 min), じゅっぷん (10 min), さんじゅっぷん (30 min)`,
            examples: [
              { jp: 'りんご を みっつ ください。', romaji: 'Ringo wo mittsu kudasai.', en: 'Three apples, please.' },
              { jp: 'がくせい が さんにん います。', romaji: 'Gakusei ga sannin imasu.', en: 'There are 3 students.' },
              { jp: 'いま さんじ じゅうごふん です。', romaji: 'Ima sanji juugofun desu.', en: 'It\'s 3:15 now.' },
            ],
          },
        ],
      },
      {
        title: 'Unit 3: Expanding Your Toolkit',
        lessons: [
          {
            title: 'Expressing Desire: ～たい & ほしい',
            content: `**～たい (tai)** — "want to do" (verb)
  Change ます to たい: たべます → たべたい (tabetai — want to eat)
  The object can take が or を: すし が/を たべたい です。

  Negative: たべたくない (tabetakunai — don't want to eat)
  Past: たべたかった (tabetakatta — wanted to eat)

Note: ～たい is only used for YOUR desires. For others, use ～たがっている:
  かれ は にほん に いきたがっています。(Kare wa Nihon ni ikitagatte imasu.) — He wants to go to Japan.

**ほしい (hoshii)** — "want" (noun/thing)
  あたらしい くるま が ほしい です。(Atarashii kuruma ga hoshii desu.) — I want a new car.
  For others: ～をほしがっている`,
            examples: [
              { jp: 'にほん に いきたい です。', romaji: 'Nihon ni ikitai desu.', en: 'I want to go to Japan.' },
              { jp: 'なに が たべたい です か。', romaji: 'Nani ga tabetai desu ka.', en: 'What do you want to eat?' },
              { jp: 'やすみ が ほしい です。', romaji: 'Yasumi ga hoshii desu.', en: 'I want a vacation.' },
            ],
          },
          {
            title: 'Making Requests & Suggestions',
            content: `**～てください (te kudasai)** — "Please do..."
  たべて ください。(Tabete kudasai.) — Please eat.
  みて ください。(Mite kudasai.) — Please look.

**～ないでください (naide kudasai)** — "Please don't..."
  さわらないで ください。(Sawaranaide kudasai.) — Please don't touch.

**～ましょう (mashou)** — "Let's..."
  いきましょう。(Ikimashou.) — Let's go.

**～ませんか (masen ka)** — "Won't you...?" (polite invitation)
  いっしょに たべませんか。(Issho ni tabemasen ka.) — Won't you eat together (with me)?

**～ましょうか (mashou ka)** — "Shall I...?" (offering help)
  てつだいましょうか。(Tetsudaimashou ka.) — Shall I help?`,
            examples: [
              { jp: 'もう いちど いって ください。', romaji: 'Mou ichido itte kudasai.', en: 'Please say it one more time.' },
              { jp: 'しゃしん を とりましょう。', romaji: 'Shashin wo torimashou.', en: 'Let\'s take a photo.' },
              { jp: 'まど を あけましょうか。', romaji: 'Mado wo akemashou ka.', en: 'Shall I open the window?' },
            ],
          },
          {
            title: 'Connecting Sentences',
            content: `**～て form** — connects actions in sequence:
  あさ おきて、シャワー を あびて、あさごはん を たべます。
  (Asa okite, shawaa wo abite, asagohan wo tabemasu.)
  I wake up, take a shower, and eat breakfast.

**～から (kara)** — "because" (reason first):
  あつい から、エアコン を つけましょう。
  (Atsui kara, eakon wo tsukemashou.) — Because it's hot, let's turn on the AC.

**～けど / けれども (kedo)** — "but / although":
  にほんご は むずかしい けど、おもしろい です。
  (Nihongo wa muzukashii kedo, omoshiroi desu.) — Japanese is difficult, but interesting.

**～たり～たり する** — "do things like A and B":
  やすみ の ひ は ほん を よんだり、えいが を みたり します。
  (Yasumi no hi wa hon wo yondari, eiga wo mitari shimasu.)
  On days off, I do things like read books and watch movies.`,
            examples: [
              { jp: 'スーパー に いって、やさい を かいました。', romaji: 'Suupaa ni itte, yasai wo kaimashita.', en: 'I went to the supermarket and bought vegetables.' },
              { jp: 'つかれた から、はやく ねます。', romaji: 'Tsukareta kara, hayaku nemasu.', en: 'Because I\'m tired, I\'ll sleep early.' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 'Elementary',
    jlpt: 'N4',
    color: 'blue',
    description: 'Build complexity — conditionals, potential form, giving/receiving, and more nuanced expression.',
    units: [
      {
        title: 'Unit 4: Intermediate Grammar Foundations',
        lessons: [
          {
            title: 'Te-form & Ongoing Actions (ている)',
            content: `The て-form is one of the most important forms in Japanese. Combined with いる, it expresses:

**Ongoing action** (like English "-ing"):
  いま たべています。(Ima tabete imasu.) — I am eating now.
  あめ が ふっています。(Ame ga futte imasu.) — It is raining.

**Resulting state** (the action happened and the result continues):
  けっこん しています。(Kekkon shite imasu.) — I am married. (= I got married and am still married)
  とうきょう に すんでいます。(Toukyou ni sunde imasu.) — I live in Tokyo.

**Habitual action:**
  まいあさ ジョギング をしています。(Maiasa jogingu wo shite imasu.) — I jog every morning (as a habit).

Te-form rules for Godan verbs:
  う/つ/る → って: かう→かって, まつ→まって
  む/ぶ/ぬ → んで: のむ→のんで, あそぶ→あそんで
  く → いて: かく→かいて (exception: いく→いって)
  ぐ → いで: およぐ→およいで
  す → して: はなす→はなして`,
            examples: [
              { jp: 'でんわ で はなしています。', romaji: 'Denwa de hanashite imasu.', en: 'I am talking on the phone.' },
              { jp: 'めがね を かけています。', romaji: 'Megane wo kakete imasu.', en: 'I am wearing glasses.' },
              { jp: 'あの みせ を しっていますか。', romaji: 'Ano mise wo shitte imasu ka.', en: 'Do you know that shop?' },
            ],
          },
          {
            title: 'Conditionals: たら, ば, と, なら',
            content: `Japanese has four conditional forms, each with different nuances:

**～たら (tara)** — "If/When" (most versatile, good default choice)
  あめ が ふったら、いえ に います。(Ame ga futtara, ie ni imasu.) — If it rains, I'll stay home.
  Formation: past tense + ら (たべた→たべたら, いった→いったら)

**～ば (ba)** — "If" (hypothetical, focuses on the condition)
  やすければ、かいます。(Yasukereba, kaimasu.) — If it's cheap, I'll buy it.
  Formation: change final u→eba (いく→いけば, たべる→たべれば)
  い-adj: change い→ければ (やすい→やすければ)

**～と (to)** — "When/If" (natural/automatic consequence)
  はる に なると、さくら が さきます。(Haru ni naru to, sakura ga sakimasu.) — When spring comes, cherry blossoms bloom.
  Used for: habits, natural laws, machine operations, giving directions.

**～なら (nara)** — "If (it's the case that)" (contextual)
  にほん に いく なら、きょうと が おすすめ です。
  (Nihon ni iku nara, Kyouto ga osusume desu.) — If you're going to Japan, I recommend Kyoto.`,
            examples: [
              { jp: 'じかん が あったら、あそびに いきましょう。', romaji: 'Jikan ga attara, asobi ni ikimashou.', en: 'If we have time, let\'s go hang out.' },
              { jp: 'この ボタン を おすと、ドア が あきます。', romaji: 'Kono botan wo osu to, doa ga akimasu.', en: 'When you press this button, the door opens.' },
            ],
          },
          {
            title: 'Potential Form: "Can do"',
            content: `Express ability with the potential form:

**Ichidan verbs:** Drop る, add られる
  たべる → たべられる (taberareru — can eat)
  みる → みられる (mirareru — can see)
  *Colloquially, ら is often dropped: たべれる (tabereru)

**Godan verbs:** Change final u-sound to e-sound, add る
  はなす → はなせる (hanaseru — can speak)
  よむ → よめる (yomeru — can read)
  かく → かける (kakeru — can write)
  のむ → のめる (nomeru — can drink)

**Irregular:**
  する → できる (dekiru — can do)
  くる → こられる (korareru — can come)

Note: With potential form, the object often takes が instead of を:
  にほんご が はなせます。(Nihongo ga hanasemasu.) — I can speak Japanese.`,
            examples: [
              { jp: 'さしみ が たべられますか。', romaji: 'Sashimi ga taberaremasu ka.', en: 'Can you eat sashimi?' },
              { jp: 'にほんご で メール が かけます。', romaji: 'Nihongo de meeru ga kakemasu.', en: 'I can write emails in Japanese.' },
              { jp: 'あした こられますか。', romaji: 'Ashita koraremasu ka.', en: 'Can you come tomorrow?' },
            ],
          },
          {
            title: 'Giving & Receiving: あげる, くれる, もらう',
            content: `Japanese carefully tracks the direction of giving/receiving:

**あげる (ageru)** — I/someone gives TO someone else (outward)
  わたし は ともだち に プレゼント を あげました。
  (Watashi wa tomodachi ni purezento wo agemashita.) — I gave a present to my friend.

**くれる (kureru)** — Someone gives TO me/my group (inward)
  ともだち が わたし に ほん を くれました。
  (Tomodachi ga watashi ni hon wo kuremashita.) — My friend gave me a book.

**もらう (morau)** — I/someone receives FROM someone
  わたし は せんせい に ほん を もらいました。
  (Watashi wa sensei ni hon wo moraimashita.) — I received a book from the teacher.

**て-form + あげる/くれる/もらう** — doing favors:
  ともだち が てつだって くれました。— My friend helped me (and I'm grateful).
  せんせい に おしえて もらいました。— I had the teacher teach me.`,
            examples: [
              { jp: 'はは が おべんとう を つくって くれました。', romaji: 'Haha ga obentou wo tsukutte kuremashita.', en: 'My mother made me a bento (and I\'m grateful).' },
              { jp: 'にもつ を もって あげましょうか。', romaji: 'Nimotsu wo motte agemashou ka.', en: 'Shall I carry your luggage for you?' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 'Intermediate',
    jlpt: 'N3',
    color: 'violet',
    description: 'Bridge to advanced — passive, causative, complex connectors, and formal speech patterns.',
    units: [
      {
        title: 'Unit 5: Complex Grammar',
        lessons: [
          {
            title: 'Passive Form',
            content: `The passive form expresses "something was done (to someone)."

**Ichidan:** Drop る, add られる — たべる → たべられる (taberareru)
**Godan:** Change u→areru — よむ → よまれる (yomareru), かく → かかれる (kakareru)
**Irregular:** する → される (sareru), くる → こられる (korareru)

**Direct passive** (standard):
  この ほん は おおくの ひと に よまれています。
  (Kono hon wa ooku no hito ni yomarete imasu.) — This book is read by many people.

**Indirect passive** (suffering passive — unique to Japanese):
  あめ に ふられました。(Ame ni furaremashita.) — I was rained on. (= It rained on me and I suffered.)
  でんしゃ で あし を ふまれました。(Densha de ashi wo fumaremashita.) — My foot was stepped on in the train.

The "suffering passive" expresses that something happened to you and you were negatively affected.`,
            examples: [
              { jp: 'せんせい に ほめられました。', romaji: 'Sensei ni homeraremashita.', en: 'I was praised by the teacher.' },
              { jp: 'さいふ を ぬすまれました。', romaji: 'Saifu wo nusumaremashita.', en: 'My wallet was stolen.' },
              { jp: 'よなか に あかちゃん に なかれました。', romaji: 'Yonaka ni akachan ni nakaremashita.', en: 'The baby cried on me in the middle of the night.' },
            ],
          },
          {
            title: 'Causative Form: Make/Let Someone Do',
            content: `**Ichidan:** Drop る, add させる — たべる → たべさせる (tabesaseru)
**Godan:** Change u→aseru — よむ → よませる (yomaseru), いく → いかせる (ikaseru)
**Irregular:** する → させる (saseru), くる → こさせる (kosaseru)

**"Make" someone do:**
  せんせい は がくせい に ほん を よませました。
  (Sensei wa gakusei ni hon wo yomasemashita.) — The teacher made the students read a book.

**"Let" someone do:**
  こども に すきな おもちゃ を えらばせました。
  (Kodomo ni suki na omocha wo erabasemashita.) — I let the child choose their favorite toy.

Context determines "make" vs "let." Adding ～てあげる softens to "let":
  はやく かえらせて あげましょう。— Let's let them go home early.

**Causative-passive** (was made to do):
  まいにち ざんぎょう させられます。(Mainichi zangyou saseraremasu.) — I'm made to work overtime every day.`,
            examples: [
              { jp: 'おや は こども に やさい を たべさせます。', romaji: 'Oya wa kodomo ni yasai wo tabesasemasu.', en: 'Parents make children eat vegetables.' },
              { jp: 'しゃちょう に にほんご の スピーチ を させられました。', romaji: 'Shachou ni nihongo no supiichi wo saseraremashita.', en: 'I was made to give a speech in Japanese by the president.' },
            ],
          },
          {
            title: 'Formal Speech: Introduction to Keigo',
            content: `Keigo (けいご) is the Japanese honorific system with three levels:

**1. ていねいご (Teineigo) — Polite language**
  What you already know: ～ます, ～です forms.
  Used with: strangers, colleagues, acquaintances.

**2. そんけいご (Sonkeigo) — Respectful language**
  Elevates the OTHER person's actions. Used when talking ABOUT superiors.
  Pattern: お + [verb stem] + に なる
    よむ → およみ に なる (oyomi ni naru) — [someone respected] reads
  Special verbs:
    いく/くる → いらっしゃる (irassharu) — go/come (respectful)
    たべる/のむ → めしあがる (meshiagaru) — eat/drink (respectful)
    いう → おっしゃる (ossharu) — say (respectful)
    する → なさる (nasaru) — do (respectful)
    みる → ごらんになる (goran ni naru) — see (respectful)

**3. けんじょうご (Kenjougo) — Humble language**
  Lowers YOUR OWN actions to show respect to the listener.
  Pattern: お + [verb stem] + する
    もつ → おもち する (omochi suru) — I carry (humble)
  Special verbs:
    いく/くる → まいる (mairu) — go/come (humble)
    たべる/のむ → いただく (itadaku) — eat/drink (humble)
    いう → もうす (mousu) — say (humble)
    する → いたす (itasu) — do (humble)
    みる → はいけん する (haiken suru) — see (humble)`,
            examples: [
              { jp: 'しゃちょう は もう おかえり に なりました。', romaji: 'Shachou wa mou okaeri ni narimashita.', en: 'The president has already gone home. (respectful)' },
              { jp: 'わたくし が ごあんない いたします。', romaji: 'Watakushi ga goannai itashimasu.', en: 'I will guide you. (humble)' },
              { jp: 'なに を めしあがりますか。', romaji: 'Nani wo meshiagarimasu ka.', en: 'What would you like to eat? (respectful)' },
            ],
          },
          {
            title: 'Complex Connectors',
            content: `**のに (noni)** — "even though / despite" (with frustration/surprise):
  べんきょう した のに、しけん に おちました。
  (Benkyou shita noni, shiken ni ochimashita.) — Even though I studied, I failed the exam.

**ので (node)** — "because" (softer/more polite than から):
  あめ が ふっている ので、タクシー で いきます。
  (Ame ga futte iru node, takushii de ikimasu.) — Because it's raining, I'll go by taxi.

**ために (tame ni)** — "in order to / for the sake of":
  にほん に いく ために、おかね を ためています。
  (Nihon ni iku tame ni, okane wo tamete imasu.) — I'm saving money in order to go to Japan.

**ところ (tokoro)** — timing expressions:
  いま でかける ところ です。(About to go out.)
  いま たべている ところ です。(In the middle of eating.)
  いま かえった ところ です。(Just got home.)

**ば～ほど** — "the more... the more...":
  れんしゅう すれば するほど、じょうず に なります。
  (Renshuu sureba suru hodo, jouzu ni narimasu.) — The more you practice, the better you get.`,
            examples: [
              { jp: 'やくそく した のに、こなかった。', romaji: 'Yakusoku shita noni, konakatta.', en: 'Even though they promised, they didn\'t come.' },
              { jp: 'けんこう の ために、まいにち あるいています。', romaji: 'Kenkou no tame ni, mainichi aruite imasu.', en: 'I walk every day for my health.' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 'Upper-Intermediate',
    jlpt: 'N2',
    color: 'orange',
    description: 'Advanced nuance — literary expressions, nuanced connectors, and professional Japanese.',
    units: [
      {
        title: 'Unit 6: Advanced Expression',
        lessons: [
          {
            title: 'Advanced Grammar Patterns',
            content: `**にもかかわらず** — "despite / in spite of" (formal):
  けいけん が ない にもかかわらず、さいよう されました。
  (Keiken ga nai ni mo kakawarazu, saiyou saremashita.) — Despite having no experience, I was hired.

**わけがない** — "there's no way that":
  かれ が うそ を つく わけがない。(Kare ga uso wo tsuku wake ga nai.) — There's no way he would lie.

**わけではない** — "it doesn't mean that":
  にほんご が きらい な わけではない。(Nihongo ga kirai na wake dewa nai.) — It doesn't mean I dislike Japanese.

**ことはない** — "there's no need to":
  しんぱい する ことはない です。(Shinpai suru koto wa nai desu.) — There's no need to worry.

**うちに** — "while (before the situation changes)":
  わすれない うちに メモ します。(Wasurenai uchi ni memo shimasu.) — I'll take notes before I forget.
  あかるい うちに かえりましょう。(Akarui uchi ni kaerimashou.) — Let's go home while it's still light.

**ついでに** — "while you're at it":
  コンビニ に いく ついでに、てがみ を だして ください。
  (Konbini ni iku tsuide ni, tegami wo dashite kudasai.) — While you're going to the convenience store, please mail this letter.`,
            examples: [
              { jp: 'あめ にもかかわらず、おおぜい の ひと が きました。', romaji: 'Ame ni mo kakawarazu, oozei no hito ga kimashita.', en: 'Despite the rain, many people came.' },
              { jp: 'あわてる ことはない です。じかん は たっぷり あります。', romaji: 'Awateru koto wa nai desu. Jikan wa tappuri arimasu.', en: 'There\'s no need to rush. There\'s plenty of time.' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 'Advanced',
    jlpt: 'N1',
    color: 'rose',
    description: 'Near-native mastery — keigo fluency, literary forms, idiomatic expressions, and cultural nuance.',
    units: [
      {
        title: 'Unit 7: Mastery',
        lessons: [
          {
            title: 'Advanced Keigo & Business Japanese',
            content: `At the advanced level, keigo becomes second nature. Key patterns:

**Business email patterns:**
  おつかれさまです。(Otsukaresama desu.) — Standard greeting to colleagues.
  おせわ に なっております。(Osewa ni natte orimasu.) — Thank you for your continued support. (to clients)
  ごかくにん の ほど、よろしく おねがい いたします。— I kindly request your confirmation.

**Meeting language:**
  ごいけん を おきかせ ください。(Goiken wo okikase kudasai.) — Please share your opinion.
  けんとう させて いただきます。(Kentou sasete itadakimasu.) — Allow me to consider it.

**Telephone keigo:**
  もしもし、○○ の △△ と もうします。— Hello, this is △△ from ○○.
  ○○さま は いらっしゃいますか。— Is Mr./Ms. ○○ available?
  しょうしょう おまち ください。— Please wait a moment.
  でんごん を おねがい できますか。— May I leave a message?

**Double keigo (avoid):**
  ✗ おっしゃられる (double respectful — incorrect)
  ○ おっしゃる (correct respectful form of いう)`,
            examples: [
              { jp: 'ぶちょう、こちら の しりょう を ごらん いただけますか。', romaji: 'Buchou, kochira no shiryou wo goran itadakemasu ka.', en: 'Director, could you please look at these materials?' },
              { jp: 'おいそがしい ところ おそれいります が...', romaji: 'Oisogashii tokoro osoreirimasu ga...', en: 'I\'m sorry to bother you when you\'re busy, but...' },
            ],
          },
          {
            title: 'Literary & Formal Expressions',
            content: `**がゆえに** — "precisely because" (literary/formal):
  まじめ がゆえに、ストレス が たまる。— Precisely because one is serious, stress accumulates.

**をもって** — "with / by means of" (very formal):
  ほんじつ をもって、へいてん いたします。— As of today, we will close.

**ずにはいられない** — "can't help but do":
  あの えいが を みたら、なかずにはいられない。— If you watch that movie, you can't help but cry.

**にほかならない** — "is nothing other than":
  せいこう は どりょく の けっか にほかならない。— Success is nothing but the result of effort.

**ともなると** — "when it comes to / at the level of":
  しゃちょう ともなると、せきにん が おもい。— When you're a company president, the responsibility is heavy.

**ものの** — "although" (literary):
  にほん に きた ものの、にほんご が ぜんぜん はなせない。
  — Although I came to Japan, I can't speak Japanese at all.

**にすぎない** — "is nothing more than":
  これ は わたし の いけん にすぎません。— This is nothing more than my opinion.`,
            examples: [
              { jp: 'どりょく なくして せいこう なし。', romaji: 'Doryoku nakushite seikou nashi.', en: 'Without effort, there is no success.' },
              { jp: 'ねんれい を とわず、だれでも さんか できます。', romaji: 'Nenrei wo towazu, daredemo sanka dekimasu.', en: 'Regardless of age, anyone can participate.' },
            ],
          },
        ],
      },
    ],
  },
];
