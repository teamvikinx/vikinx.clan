import { Chip, Divider } from "@nextui-org/react";
import React from "react";

const Page = () => {
  return (
    <div className="py-16">
      <h1 className="title">Terms and Conditions</h1>
      <Divider className="my-4" />
      <div className="space-y-8">
        <div>
          <h3 className="subtitle">Acceptance of Terms</h3>
          <div>
            By accessing and using the VikinX platform (“Service”), you are
            agreeing to be bound by these Terms and Conditions. If you do not
            agree to these terms, we kindly request you to refrain from using
            our Service.
          </div>
        </div>
        <div>
          <h3 className="subtitle">User Account, Password, and Security</h3>
          <div>
            Upon completing the registration formalities, you will receive a
            password and user account. You are responsible for maintaining the
            confidentiality of the password and user account, including all
            activities that may occur under your account. You agree to:
          </div>
          <ol className="list-decimal list-outside pl-4 mt-4">
            <li>
              Immediately notify VikinX of any unauthorized use of your password
              or account or any other breach of security, and
            </li>
            <li>
              Ensure that you exit from your account at the end of each session.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="subtitle">User Responsibilities</h3>
          <div>As a user of the Service, you agree to:</div>
          <ol className="list-decimal list-outside pl-4 mt-4">
            <li>
              Use the Service responsibly and in a manner that complies with all
              applicable laws and regulations.
            </li>
            <li>
              Carry a valid driver’s license and valid vehicle documents at all
              times while using the Service.
            </li>
            <li>
              Assume full responsibility for any risks associated with your use
              of the Service.
            </li>
            <li>
              Acknowledge that riding motorcycles carries inherent risks, and
              you assume all responsibility for any harm, injury, or damage that
              may occur as a result of your use of the Service.
            </li>
            <li>
              Comply with all traffic laws and regulations, and ride responsibly
              with proper riding gears.
            </li>
            <li>
              Understand that participation in any rides hosted by VikinX is
              voluntary and at your own risk.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="subtitle">Feedback, Comments, Blogs</h3>
          <div>
            Any feedback, comment, blogs etc. provided by the user and received
            by VikinX shall constitute non-confidential information. By
            submitting any such information to VikinX, you agree that you are
            transferring and assigning, at no charge, all of your right, title
            and interest in the information, including all copyrights and other
            intellectual property rights. You agree that VikinX shall be free to
            use such information on an unrestricted basis.
          </div>
        </div>
        <div>
          <h3 className="subtitle">Termination</h3>
          <div>
            You agree that VikinX may suspend, terminate or remove your
            password, account, material you may have contributed (or any part
            thereof) or use of this platform or any service if it believes, in
            its sole and absolute discretion that you have breached any of the
            terms and conditions of this Agreement.
          </div>
        </div>
        <div>
          <h3 className="subtitle">Limitation of Liability</h3>
          <div>
            VikinX, its affiliates, and its personnel are not liable for any
            harm, injury, or damage that may occur as a result of your use of
            the Service. This includes, but is not limited to, any harm, injury,
            or damage resulting from:
          </div>

          <ol className="list-decimal list-outside pl-4 mt-4">
            <li>Your failure to comply with traffic laws and regulations.</li>
            <li>Your failure to wear appropriate safety gear.</li>
            <li>Any mechanical issues with your motorcycle.</li>
            <li>
              Any acts or omissions by other riders who join the rides hosted by
              VikinX.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="subtitle">Indemnification</h3>
          <div>
            You agree to indemnify and hold harmless VikinX, its affiliates, and
            its personnel from any claims, damages, liabilities, losses, costs,
            or expenses (including legal fees) arising out of your use of the
            Service, your participation in any rides hosted by VikinX, or any
            acts or omissions by other riders who join these rides.
          </div>
        </div>
        <div>
          <h3 className="subtitle">Governing Law</h3>
          <div>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India. Any disputes arising out of or in
            connection with the Service shall be subject to the exclusive
            jurisdiction of the courts in Mumbai, Maharashtra, India.
          </div>
        </div>
        <div>
          <h3 className="subtitle">Changes to Terms and Conditions</h3>
          <div>
            VikinX reserves the right to modify these Terms and Conditions at
            any time. We recommend that you periodically review these Terms and
            Conditions to ensure you are aware of any changes.
          </div>
        </div>
        <div>
          <h3 className="subtitle">Contact Us</h3>
          <div>
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <Chip color="primary" size="sm" variant="flat">
              team@vikinx.in
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
