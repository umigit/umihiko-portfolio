import { Story, Meta } from '@storybook/react';
import { BlogPostPanel, Props } from '../components/blog-post-panel';

export default {
  title: 'Components/BlogPostPanel',
  component: BlogPostPanel,
} as Meta;

const Template: Story<Props> = (args) => <BlogPostPanel {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  post: {
    image: {
      title: 'dummy',
      url: 'https://storage.googleapis.com/umihiko-images-development/images/dummy.png',
    },
    category: '日記',
    slug: 'story-slug',
    title: 'テスト記事',
    introduction: 'テストです',
    publishedAt: '2021-08-25T13:45:49+00:00',
  },
};
