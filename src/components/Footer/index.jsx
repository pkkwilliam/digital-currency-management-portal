import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'pkkwilliam 創意實驗室',
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
          key: 'Ka Kei Pun Tech',
          title: 'Ka Kei Tech',
          href: 'https://www.linkedin.com/in/pkkwilliam/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
