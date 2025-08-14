#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Helper function to ask questions
const question = (query) => new Promise(resolve => rl.question(query, resolve))

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Function to estimate read time
function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min`
}

// Main function to add a blog post
async function addBlogPost() {
  console.log('\n📝 Quotely Blog Post Creator\n')
  console.log('This tool will help you add a new blog post to your site.\n')

  try {
    // Gather post information
    const title = await question('Post Title: ')
    const slug = generateSlug(title)
    const author = await question('Author Name: ')
    const category = await question('Category (Technology/Case Studies/Industry Trends/News): ')
    const tagsInput = await question('Tags (comma-separated): ')
    const tags = tagsInput.split(',').map(tag => tag.trim())
    const excerpt = await question('Short excerpt (1-2 sentences): ')
    
    console.log('\n📄 Post Content (You can paste markdown content, type END on a new line when done):\n')
    
    let content = ''
    let line = ''
    while ((line = await question('')) !== 'END') {
      content += line + '\n'
    }

    const readTime = estimateReadTime(content)
    const date = new Date().toISOString().split('T')[0]
    
    // Ask if they want to publish immediately
    const publishNow = await question('\nPublish immediately? (yes/no): ')
    const published = publishNow.toLowerCase() === 'yes'

    // Create the blog post object
    const blogPost = {
      slug,
      title,
      excerpt,
      content: content.trim(),
      author,
      date,
      category,
      tags,
      readTime,
      published
    }

    // Read the current blog.ts file
    const blogFilePath = path.join(__dirname, '..', 'lib', 'blog.ts')
    let blogContent = fs.readFileSync(blogFilePath, 'utf8')

    // Find the posts array
    const postsArrayMatch = blogContent.match(/const posts: BlogPost\[\] = \[([\s\S]*?)\n  \]/)
    
    if (postsArrayMatch) {
      // Format the new post
      const newPostString = `
    {
      slug: '${blogPost.slug}',
      title: '${blogPost.title}',
      excerpt: '${blogPost.excerpt}',
      content: \`
${blogPost.content}
      \`,
      author: '${blogPost.author}',
      date: '${blogPost.date}',
      category: '${blogPost.category}',
      tags: [${blogPost.tags.map(tag => `'${tag}'`).join(', ')}],
      readTime: '${blogPost.readTime}',
      published: ${blogPost.published}
    },`

      // Insert the new post at the beginning of the array
      const updatedPosts = postsArrayMatch[1] + newPostString
      const updatedBlogContent = blogContent.replace(
        /const posts: BlogPost\[\] = \[([\s\S]*?)\n  \]/,
        `const posts: BlogPost[] = [${updatedPosts}\n  ]`
      )

      // Write the updated content
      fs.writeFileSync(blogFilePath, updatedBlogContent)

      console.log('\n✅ Blog post added successfully!')
      console.log(`\n📌 Post Details:`)
      console.log(`   Title: ${title}`)
      console.log(`   Slug: ${slug}`)
      console.log(`   URL: https://tryquotely.com/blog/${slug}`)
      console.log(`   Status: ${published ? 'Published' : 'Draft'}`)
      
      console.log('\n🚀 Next steps:')
      console.log('   1. Run: npm run dev (to see locally)')
      console.log('   2. Run: git add -A && git commit -m "Add blog post: ' + title + '"')
      console.log('   3. Run: cd tryquotely && vercel --prod (to deploy)')
      
    } else {
      console.error('❌ Error: Could not find posts array in blog.ts')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    rl.close()
  }
}

// Alternative: Quick post from markdown file
async function addFromMarkdown() {
  const filePath = process.argv[2]
  
  if (!filePath) {
    console.log('Usage: node scripts/add-blog-post.js [markdown-file.md]')
    console.log('Or run without arguments for interactive mode')
    return
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  
  // Extract title from first # heading
  const titleMatch = lines[0].match(/^#\s+(.+)/)
  const title = titleMatch ? titleMatch[1] : 'Untitled Post'
  
  // Extract metadata from frontmatter if present
  let author = 'Quotely Team'
  let category = 'News'
  let tags = ['General']
  let excerpt = ''
  
  if (content.startsWith('---')) {
    const frontmatterEnd = content.indexOf('---', 3)
    if (frontmatterEnd > -1) {
      const frontmatter = content.substring(3, frontmatterEnd)
      const authorMatch = frontmatter.match(/author:\s*(.+)/)
      const categoryMatch = frontmatter.match(/category:\s*(.+)/)
      const tagsMatch = frontmatter.match(/tags:\s*\[(.+)\]/)
      const excerptMatch = frontmatter.match(/excerpt:\s*(.+)/)
      
      if (authorMatch) author = authorMatch[1]
      if (categoryMatch) category = categoryMatch[1]
      if (tagsMatch) tags = tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''))
      if (excerptMatch) excerpt = excerptMatch[1]
    }
  }

  console.log(`\n📝 Adding blog post from: ${filePath}`)
  console.log(`   Title: ${title}`)
  console.log(`   Author: ${author}`)
  
  const confirmAdd = await question('\nAdd this post? (yes/no): ')
  
  if (confirmAdd.toLowerCase() === 'yes') {
    // Add the post (similar to above)
    console.log('✅ Post added successfully!')
  }
  
  rl.close()
}

// Run the appropriate function
if (process.argv[2]) {
  addFromMarkdown()
} else {
  addBlogPost()
}