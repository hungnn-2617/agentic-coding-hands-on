import Image from 'next/image';

export function AboutContent() {
  return (
    <section className="w-full max-w-[1152px] mx-auto px-4 py-12 sm:px-12 sm:py-16 lg:px-[104px] lg:py-[120px] rounded-lg">
      <div className="flex flex-col items-center gap-8">
        {/* ROOT FURTHER Logo (small) */}
        <Image
          src="/images/root-further-logo-about.png"
          alt="ROOT FURTHER"
          width={300}
          height={130}
          className="w-[200px] sm:w-[250px] lg:w-[300px] h-auto object-contain"
        />

        {/* Body Text — Montserrat 24px/32px 700 at desktop per design-style.md */}
        <div className="text-white text-base sm:text-lg lg:text-2xl font-bold leading-6 sm:leading-7 lg:leading-8 text-justify space-y-6">
          <p>
            Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ
            khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành
            tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, mỗi Sunner
            đều là &quot;problem-solver&quot; - chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi
            bài toán của dự án, khách hàng và xã hội.
          </p>
          <p>
            Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào
            sâu để bứt phá trong kỷ nguyên AI, &quot;Root Further&quot; đã được chọn để trở thành chủ đề chính
            thức của Lễ trao giải Sun* Annual Awards 2025.
          </p>
          <p>
            Vượt xa khỏi nét nghĩa bề mặt, &quot;Root Further&quot; chính là hành trình chúng ta không ngừng
            vươn xa hơn, cảm rễ mạnh hơn, chạm đến những tầng &quot;địa chất&quot; ẩn sâu để tiếp tục tồn tại,
            vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Muốn hinh
            ảnh bỏ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ lên khi qua từng lớp &quot;trầm tích&quot; để thấm
            thấu những gì tinh tuý nhất, người Sun* cũng đang &quot;hấp thụ&quot; đường chất từ thời đại và
            những thử thách của thị trường để làm mới mình mỗi ngày, mở rộng năng lực và mạnh mẽ
            &quot;bén rễ&quot; vào kỷ nguyên AI - một tầng &quot;địa chất&quot; hoàn toàn mới, phức tạp và khó đoán,
            nhưng cũng hội tụ vô vàn tiềm năng cũng cơ hội.
          </p>
          <p>
            Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với
            những cá nhân từ tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm
            chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác được
            mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của
            chương mới trên hành trình phát triển tổ chức, &quot;Root Further&quot; còn như một lời cổ vũ, động
            viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám
            phá bỏ giới hạn, dám trở thành phiên bản đa nhiệm và xuất sắc nhất của mình. Bởi trong
            thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết
            để trường tồn.
          </p>
          <p>
            Không ai biết trước ẩn sâu trong &quot;lòng đất&quot; của ngành công nghệ và thị trường hiện đại
            còn biết bao tầng &quot;địa chất&quot; bí ẩn. Chỉ biết rằng khi &quot;Root Further&quot; đã trở thành tinh thần
            cốt rõi, chúng ta sẽ không sợ hãi, mà cảng thấy háo hức trước bất cứ vùng vô định nào trên
            hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao
            điều kỳ diệu và cơ hội vươn mình đang chờ ta.
          </p>
        </div>

        {/* Quote */}
        <blockquote className="text-white text-lg sm:text-xl font-bold italic leading-8 text-center mt-4">
          &quot;A tree with deep roots fears no storm&quot;
          <br />
          <span className="text-base not-italic text-white/70">
            (Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)
          </span>
        </blockquote>
      </div>
    </section>
  );
}
