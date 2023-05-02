import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '源代碼科技創意實驗室',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: '源代碼科技',
        //   title: '源代碼科技',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/pkkwilliam',
        //   blankTarget: true,
        // },
        {
          key: 'Bitcode Tech',
          title: 'Bitcode Tech',
          href: 'https://bitcode.mo',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
