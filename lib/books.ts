// Mock database - In real app, this would be from API/Database
const booksDatabase = {
  "toi-thay-hoa-vang-tren-co-xanh": {
    id: "1",
    slug: "toi-thay-hoa-vang-tren-co-xanh",
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    cover: "/placeholder.svg?height=300&width=200",
    description: "Một câu chuyện tuổi thơ đầy cảm động về tình anh em và những kỷ niệm không thể nào quên.",
    chapters: [
      {
        id: 1,
        slug: "tuoi-tho-o-lang",
        title: "Chương 1: Tuổi thơ ở làng",
        content:
          "# Chương 1: Tuổi thơ ở làng\n\nTôi sinh ra và lớn lên ở một ngôi làng nhỏ bên sông. Những ngày thơ ấu của tôi gắn liền với những cánh đồng lúa xanh mướt, những con đường đất đỏ uốn lượn qua từng ngôi nhà tranh.\n\nMỗi sáng thức dậy, tôi thường nghe tiếng gà gáy từ xa, tiếng chó sủa vang vọng khắp làng. Không khí trong lành của buổi sáng sớm luôn khiến tôi cảm thấy sảng khoái.\n\n## Ngôi nhà của tôi\n\nNgôi nhà của chúng tôi nằm ở cuối làng, gần bờ sông. Đó là một ngôi nhà tranh nhỏ với mái lợp bằng lá dừa nước. Trước nhà là một khoảng sân rộng, nơi mẹ tôi thường phơi lúa vào mùa gặt.\n\nPhía sau nhà là một vườn cây ăn trái nhỏ với những cây xoài, cây ổi và cây nhãn. Tôi thường trèo lên những cây này để hái trái ăn, đôi khi còn làm tổ chim rơi xuống.\n\n*Những kỷ niệm ấy giờ đây vẫn còn in đậm trong tâm trí tôi...*",
      },
      {
        id: 2,
        slug: "anh-em-nha-toi",
        title: "Chương 2: Anh em nhà tôi",
        content:
          "# Chương 2: Anh em nhà tôi\n\nTrong nhà tôi có ba anh em. Tôi là con thứ hai, có một anh trai lớn hơn hai tuổi và một em gái nhỏ hơn ba tuổi.\n\nAnh trai tôi tên là Tường, một cậu bé thông minh và hiền lành. Anh luôn bảo vệ tôi mỗi khi có chuyện gì xảy ra. Em gái tôi tên là Tuyết, một cô bé xinh xắn với đôi mắt to tròn như hai viên bi.\n\n## Những trò chơi tuổi thơ\n\nChúng tôi thường chơi những trò chơi dân gian như:\n\n- **Trốn tìm**: Chúng tôi trốn trong những bụi chuối, sau gốc cây to\n- **Đá cầu**: Dùng những quả cầu làm từ lông gà\n- **Thả diều**: Vào mùa gió, chúng tôi thường thả diều trên cánh đồng\n- **Bắt chuồn chuồn**: Dùng cành tre có dính keo để bắt chuồn chuồn\n\nNhững ngày ấy thật vô tư và hạnh phúc. Chúng tôi không biết gì về những lo toan của người lớn, chỉ biết chơi đùa và tận hưởng từng khoảnh khắc.",
      },
      {
        id: 3,
        slug: "mua-he-ben-song",
        title: "Chương 3: Mùa hè bên sông",
        content:
          '# Chương 3: Mùa hè bên sông\n\nMùa hè là thời gian tuyệt vời nhất trong năm đối với chúng tôi. Không phải đi học, chúng tôi có cả ngày để chơi đùa và khám phá.\n\nCon sông chảy qua làng tôi trong vắt như tấm gương. Nước sông mát lạnh, có nhiều loài cá nhỏ bơi lội. Bờ sông hai bên mọc đầy cỏ xanh và những cây liễu rủ cành.\n\n## Những buổi tắm sông\n\nMỗi chiều, sau khi nắng đã bớt gắt, chúng tôi thường rủ nhau ra sông tắm. Anh Tường dạy tôi bơi, từ những động tác cơ bản như nổi trên mặt nước cho đến những kiểu bơi phức tạp hơn.\n\nTôi nhớ lần đầu tiên học bơi, tôi sợ lắm. Nước sông sâu và tôi không biết bơi. Nhưng anh Tường rất kiên nhẫn, anh đỡ tôi và dạy tôi từng chút một.\n\n> "Đừng sợ, em cứ thả lỏng người ra, nước sẽ đỡ em thôi." - Anh Tường nói.\n\nVà thật kỳ diệu, sau vài lần thử, tôi đã có thể bơi được những đoạn ngắn. Cảm giác tự do trong làn nước mát lạnh thật tuyệt vời.',
      },
      {
        id: 4,
        slug: "nhung-ngay-di-hoc",
        title: "Chương 4: Những ngày đi học",
        content:
          "# Chương 4: Những ngày đi học\n\nKhi tôi lên sáu tuổi, bố mẹ cho tôi đi học ở ngôi trường làng. Trường chỉ có hai phòng học nhỏ, mái lợp bằng tôn và tường xây bằng gạch đỏ.\n\nCô giáo của tôi tên là cô Hoa, một người phụ nữ hiền lành với mái tóc dài buông xõa. Cô luôn kiên nhẫn dạy chúng tôi từng chữ cái, từng con số.\n\n## Những bài học đầu tiên\n\nTôi nhớ bài học đầu tiên là học chữ 'a'. Cô Hoa viết chữ 'a' lên bảng đen bằng phấn trắng, rồi dạy chúng tôi cách phát âm.\n\n*'A như con ăn, a như cây ăn quả...'*\n\nChúng tôi ngồi trên những chiếc ghế gỗ cũ, cầm bút chì viết vào vở kẻ ngang. Tay tôi còn nhỏ, cầm bút chì còn vụng về, những nét chữ viết ra cong cong, lệch lệch.\n\nNhưng tôi rất hào hứng với việc học. Mỗi khi học được một chữ cái mới, tôi lại chạy về nhà khoe với bố mẹ.",
      },
      {
        id: 5,
        slug: "ky-niem-kho-quen",
        title: "Chương 5: Kỷ niệm khó quên",
        content:
          "# Chương 5: Kỷ niệm khó quên\n\nCó một kỷ niệm mà tôi không bao giờ quên được. Đó là ngày tôi cùng anh Tường đi bắt cá ở con suối nhỏ sau làng.\n\nHôm đó trời nắng đẹp, chúng tôi mang theo cần câu tre và một cái thúng nhỏ. Con suối trong vắt, có thể nhìn thấy những con cá nhỏ bơi lội dưới đáy.\n\n## Cuộc phiêu lưu bắt cá\n\nAnh Tường dạy tôi cách thả câu, cách giữ im lặng để không làm cá sợ. Chúng tôi ngồi bên bờ suối, kiên nhẫn chờ đợi.\n\nĐột nhiên, cần câu của tôi rung lên. Tôi hồi hộp kéo lên và thấy một con cá nhỏ đang vùng vẫy ở đầu câu. Tôi vui mừng hét lên:\n\n*'Anh ơi, em câu được cá rồi!'*\n\nAnh Tường cười và khen tôi giỏi. Chúng tôi tiếp tục câu cho đến chiều, bắt được cả thúng cá nhỏ. Về nhà, mẹ nấu cháo cá cho cả nhà ăn. Đó là bữa cơm ngon nhất mà tôi từng được ăn.",
      },
    ],
  },
  "de-men-phieu-luu-ky": {
    id: "2",
    slug: "de-men-phieu-luu-ky",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    cover: "/placeholder.svg?height=300&width=200",
    description: "Cuộc phiêu lưu kỳ thú của chú dế mèn qua những vùng đất xa lạ.",
    chapters: [
      {
        id: 1,
        slug: "de-men-va-gia-dinh",
        title: "Chương 1: Dế Mèn và gia đình",
        content:
          "# Chương 1: Dế Mèn và gia đình\n\nDế Mèn là một chú dế con thông minh và hiếu động. Chú sống cùng với gia đình nhỏ của mình trong một cái hang nhỏ dưới gốc cây đa cổ thụ.\n\nGia đình dế Mèn gồm có bố, mẹ và hai anh em. Bố dế Mèn là một con dế già có kinh nghiệm, luôn dạy con cách sinh tồn trong tự nhiên. Mẹ dế Mèn hiền lành, luôn lo lắng cho con.\n\n## Cuộc sống hàng ngày\n\nMỗi ngày, dế Mèn thường thức dậy sớm cùng với tiếng chim hót. Chú thích khám phá xung quanh, tìm hiểu về thế giới bên ngoài cái hang nhỏ của mình.\n\nBố mẹ dế Mèn thường dặn dò chú không được đi xa, vì ngoài kia có nhiều nguy hiểm. Nhưng dế Mèn là một chú dế tò mò, luôn muốn khám phá những điều mới lạ.\n\n*Và rồi một ngày, cuộc phiêu lưu của dế Mèn bắt đầu...*",
      },
      {
        id: 2,
        slug: "cuoc-gap-go-dau-tien",
        title: "Chương 2: Cuộc gặp gỡ đầu tiên",
        content:
          "# Chương 2: Cuộc gặp gỡ đầu tiên\n\nTrong một lần đi chơi xa, dế Mèn gặp được con kiến đen. Con kiến đen rất thân thiện và kể cho dế Mèn nghe về thế giới bên ngoài.\n\n## Những câu chuyện kỳ thú\n\nCon kiến đen kể về những cánh đồng lúa vàng, về những con sông trong xanh, về những khu rừng rậm rạp. Dế Mèn nghe mà mê mẩn, càng thêm khao khát được đi khám phá.\n\n*'Ngoài kia có rất nhiều điều thú vị đấy, dế Mèn ạ!'* - Con kiến đen nói.\n\nDế Mèn quyết định sẽ bắt đầu cuộc hành trình khám phá thế giới. Chú tạm biệt con kiến đen và hứa sẽ kể lại những điều mình trải qua.",
      },
    ],
  },
  "so-do": {
    id: "3",
    slug: "so-do",
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    cover: "/placeholder.svg?height=300&width=200",
    description: "Tác phẩm kinh điển về xã hội Việt Nam đầu thế kỷ 20.",
    chapters: [
      {
        id: 1,
        slug: "xuan-toc-do",
        title: "Chương 1: Xuân Tóc Đỏ",
        content:
          "# Chương 1: Xuân Tóc Đỏ\n\nXuân Tóc Đỏ là một thanh niên nông thôn lên thành phố tìm cơ hội làm ăn. Anh ta mang trong mình những ước mơ về một cuộc sống khá giả, thành đạt.\n\nVới mái tóc đỏ đặc trưng và tính cách lanh lợi, Xuân nhanh chóng học được cách sống trong thành phố. Anh ta biết cách nịnh nọt, biết cách lợi dụng những cơ hội để thăng tiến.\n\n## Những bước đầu trong thành phố\n\nKhi mới đến thành phố, Xuân Tóc Đỏ chỉ là một thanh niên quê mùa, không biết gì về cuộc sống đô thị. Nhưng với sự khéo léo và tham vọng, anh ta dần dần tìm được chỗ đứng.\n\nXuân bắt đầu làm việc ở một cơ quan nhỏ, nơi anh ta học được cách 'xoay xở' để kiếm tiền và thăng tiến trong xã hội.",
      },
    ],
  },
  "chi-pheo": {
    id: "4",
    slug: "chi-pheo",
    title: "Chí Phèo",
    author: "Nam Cao",
    cover: "/placeholder.svg?height=300&width=200",
    description: "Tác phẩm nổi tiếng về số phận con người trong xã hội cũ.",
    chapters: [
      {
        id: 1,
        slug: "chi-pheo-ngay-xua",
        title: "Chương 1: Chí Phèo ngày xưa",
        content:
          "# Chương 1: Chí Phèo ngày xưa\n\nChí Phèo ngày xưa không phải là Chí Phèo ngày nay. Ngày xưa, ông ta cũng là một người nông dân chân chất, hiền lành như bao người khác trong làng.\n\nÔng ta có vợ, có con, có mảnh đất nhỏ để cày cấy. Cuộc sống tuy nghèo khó nhưng ấm no, bình yên. Chí Phèo ngày ấy là một người chồng tốt, một người cha tận tụy.\n\n## Những ngày tháng bình yên\n\nMỗi sáng, Chí Phèo thức dậy sớm để ra đồng. Ông ta cần mẫn làm việc, chăm sóc từng luống rau, từng gốc lúa. Chiều về, ông ta chơi đùa với con, trò chuyện với vợ.\n\nNhưng rồi số phận đã đẩy ông ta vào con đường khác. Những biến cố trong cuộc đời đã biến một người nông dân hiền lành thành Chí Phèo như ngày hôm nay.\n\n*Đó là một câu chuyện đau lòng về số phận con người...*",
      },
    ],
  },
}

export interface Chapter {
  id: number
  slug: string
  title: string
  content: string
}

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  cover: string
  description: string
  chapters: Chapter[]
}

// Simulate API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getBookBySlug(slug: string): Promise<Book | null> {
  // Simulate network delay
  await delay(500)

  const book = booksDatabase[slug as keyof typeof booksDatabase]
  if (!book) {
    return null
  }

  return book
}

export async function getAllBooks(): Promise<Omit<Book, "chapters">[]> {
  // Simulate network delay
  await delay(300)

  return Object.values(booksDatabase).map((book) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author,
    cover: book.cover,
    description: book.description,
  }))
}

export function getBookProgress(slug: string): number {
  if (typeof window === "undefined") return 0
  const saved = localStorage.getItem(`book-${slug}-progress`)
  return saved ? Number.parseInt(saved) : 0
}

export function calculateProgress(slug: string): number {
  const book = booksDatabase[slug as keyof typeof booksDatabase]
  if (!book) return 0

  const currentChapter = getBookProgress(slug)
  return Math.round((currentChapter / book.chapters.length) * 100)
}
