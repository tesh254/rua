import getConfig from "next/config";
import Image from "next/image";
import Layout from "@/components/layout";
import Markdown from "react-markdown";
import Link from "next/link";

const privacy = `
Privacy Policy for Rua

Welcome to Rua! Your privacy is important to us. This Privacy Policy outlines how we collect, use, and share your personal information. By using our webapp, you agree to this Privacy Policy.

1. Information We Collect: We collect your email address when you sign in with Google. We also collect information about the newsletters you receive through Rua, including the sender, subject, and content.

2. How We Use Your Information: We use your email address to create a custom email address for you to submit to newsletter subscription forms. We use the information about the newsletters you receive to display them on our webapp and to provide personalized recommendations for you.

3. How We Share Your Information: We do not share your personal information with third parties, except as required by law or as necessary to provide our services.

4. Security: We take reasonable measures to protect your personal information from unauthorized access or disclosure.

5. Retention: We retain your personal information for as long as necessary to provide our services and for other legitimate purposes, such as to comply with legal obligations.

6. Children's Privacy: Rua is not intended for children under the age of 13. We do not knowingly collect personal information from children under the age of 13.

7. Your Rights: You have the right to access, correct, and delete your personal information. You can do so by contacting us at [insert contact information].

8. Changes to this Privacy Policy: We reserve the right to modify this Privacy Policy at any time. If we make material changes to this Privacy Policy, we will notify you by email or by posting a notice on our webapp.

By using Rua, you acknowledge that you have read, understood, and agreed to this Privacy Policy. If you do not agree to this Privacy Policy, please do not use Rua.`;

const Privacy = () => {
  return (
    <Layout has_footer={true} is_readonly={true}>
      <section className="py-4">
        <Link href="/">
          <Image
            src="/images/rua-logo-gray.svg"
            alt="rua-logo"
            width={87.57}
            height={26}
          />
        </Link>
      </section>
      <section className="flex jusify-center">
        <Markdown className="flex flex-col" children={privacy} />
      </section>
    </Layout>
  );
};

export default Privacy;
