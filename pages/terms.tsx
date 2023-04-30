import getConfig from "next/config";
import Image from "next/image";
import Layout from "@/components/layout";
import Markdown from "react-markdown";
import Link from "next/link";

const terms = `
Terms and Conditions for Rua

Welcome to Rua! By using our webapp, you agree to the following terms and conditions:

1. Description of the Service: Rua allows users to read email newsletter issues on the webapp.

2. User Conduct: You agree to use Rua for lawful purposes only and not to violate any laws, regulations, or rights of third parties.

3. Intellectual Property: All content and materials on Rua, including trademarks, logos, and designs, are owned by us or our licensors and are protected by intellectual property laws. You may not use our content or materials without our prior written consent.

4. Privacy Policy: Our Privacy Policy outlines how we collect, use, and share your personal information. By using Rua, you agree to our Privacy Policy.

5. Disclaimer of Warranties: Rua is provided on an "as is" and "as available" basis without warranties of any kind, express or implied.

6. Limitation of Liability: We are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of Rua.

7. Indemnification: You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of or in connection with your use of Rua.

8. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of Kenya.

9. Modification of Terms: We reserve the right to modify these terms and conditions at any time, so please review them periodically.

By using Rua, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree to these terms and conditions, please do not use Rua.`;

const Terms = () => {
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
        <Markdown className="flex flex-col" children={terms} />
      </section>
    </Layout>
  );
};

export default Terms;
