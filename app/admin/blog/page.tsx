"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AdminNav } from "@/components/admin/admin-nav"
import { Plus, Save, Eye, Trash2, ImageIcon, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  publishedAt: string
  status: "draft" | "published"
  tags: string[]
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "How to Choose the Perfect Flagpole for Your Home",
      slug: "choose-perfect-flagpole",
      excerpt: "A comprehensive guide to selecting the right flagpole for your residential property.",
      content: "",
      featuredImage: "/placeholder.svg?height=400&width=800",
      author: "Atlantic Flag & Pole",
      publishedAt: "2024-01-15",
      status: "published",
      tags: ["residential", "guide"],
    },
  ])

  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "Atlantic Flag & Pole",
    status: "draft",
    tags: [],
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (isEditing && currentPost.id) {
      setPosts(posts.map((p) => (p.id === currentPost.id ? (currentPost as BlogPost) : p)))
    } else {
      const newPost: BlogPost = {
        ...currentPost,
        id: Date.now().toString(),
        publishedAt: new Date().toISOString().split("T")[0],
      } as BlogPost
      setPosts([newPost, ...posts])
    }
    setCurrentPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      author: "Atlantic Flag & Pole",
      status: "draft",
      tags: [],
    })
    setIsEditing(false)
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts with consistent styling</p>
          </div>
          <Button
            onClick={() => {
              setCurrentPost({
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                featuredImage: "",
                author: "Atlantic Flag & Pole",
                status: "draft",
                tags: [],
              })
              setIsEditing(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="posts">All Posts ({posts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Post" : "Create New Post"}</CardTitle>
                <CardDescription>Write and style your blog post with consistent formatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    value={currentPost.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setCurrentPost({
                        ...currentPost,
                        title,
                        slug: generateSlug(title),
                      })
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    placeholder="post-url-slug"
                    value={currentPost.slug}
                    onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">URL: /blog/{currentPost.slug || "post-url-slug"}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of the post (shown in previews)..."
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="featuredImage"
                      placeholder="/images/blog/post-image.jpg"
                      value={currentPost.featuredImage}
                      onChange={(e) => setCurrentPost({ ...currentPost, featuredImage: e.target.value })}
                    />
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {currentPost.featuredImage && (
                    <img
                      src={currentPost.featuredImage || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here... (Markdown supported)"
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use Markdown for formatting: **bold**, *italic*, # Heading, - List items
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="residential, commercial, guide"
                    value={currentPost.tags?.join(", ")}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={currentPost.status === "draft" ? "default" : "outline"}
                      onClick={() => setCurrentPost({ ...currentPost, status: "draft" })}
                    >
                      Draft
                    </Button>
                    <Button
                      variant={currentPost.status === "published" ? "default" : "outline"}
                      onClick={() => setCurrentPost({ ...currentPost, status: "published" })}
                    >
                      Published
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update Post" : "Save Post"}
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        </div>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt}
                        </span>
                        <span>{post.author}</span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
