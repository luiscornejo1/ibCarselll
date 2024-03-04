import { maxContentLength } from './config.js'
import { fetchUrl } from './helpers.js'
import { API_KEY } from './config.js'
import { baseUrl } from './config.js'
import { blogId } from './config.js'
import { maxEntriesPerPage } from './config.js'

class Blogger {
  #API_KEY
  constructor(API_KEY, baseUrl, blogId, maxEntriesPerPage, maxContentLength) {
    this.#API_KEY = API_KEY
    this.baseUrl = baseUrl
    this.blogId = blogId
    this.maxEntriesPerPage = maxEntriesPerPage
    this.maxContentLength = maxContentLength
    this.allPostsIDs = []
    this.postsIDs = []
    this.page = 1
  }

  setPage(page) {
    this.page = page
    return this
  }

  setPost(postID) {
    this.postsIDs = [postID]
    return this
  }

  paginate() {
    const skip = (this.page - 1) * this.maxEntriesPerPage
    this.postsIDs = this.allPostsIDs.slice(skip, skip + this.maxEntriesPerPage)
    return this
  }

  async getAllPostsByID(pageToken = null) {
    try {
      let url = `${this.baseUrl}${this.blogId}/posts?key=${this.#API_KEY}`
      if (pageToken) url += `&pageToken=${pageToken}`
      const response = await fetchUrl(url)
      if (!response.items) return this.allPostsIDs
      else {
        response.items.forEach(post => {
          this.allPostsIDs.push(post.id)
        })
        if (response.nextPageToken)
          await this.getAllPostsByID(response.nextPageToken)
      }

      this.numPosts = this.allPostsIDs.length
      this.maxPages = Math.ceil(this.numPosts / this.maxEntriesPerPage)
    } catch (error) {
      console.error(error)
    }
  }

  async #getPost(postID) {
    try {
      const url = `${this.baseUrl}${this.blogId}/posts/${postID}?key=${
        this.#API_KEY
      }`
      const response = await fetchUrl(url)
      return {
        id: response.id,
        title: response.title,
        content: response.content,
        date: response.date,
      }
    } catch (error) {
      console.error(error)
    }
  }

  async searchPosts(query) {
    try {
      const url = `${this.baseUrl}${this.blogId}/posts/search?q=${query}&key=${
        this.#API_KEY
      }`
      const response = await fetchUrl(url)
      if (!response.items) {
        this.postsIDs = []
        return this
      }
      this.postsIDs = response.items
        .map(post => post.id)
        .slice(0, this.maxEntriesPerPage)
      return this
    } catch (error) {
      console.error(error)
    }
  }

  #generateMarkup(post, fullPost) {
    const maxContent =
      post.content.length > this.maxContentLength && fullPost
        ? post.content
        : post.content.substring(0, this.maxContentLength).concat(' ...', '')

    return `
    <article class="m-4" id="${post.id}">
      <div class="card">
        <div style="background-color:#7d924a; padding:10px 10px 0px 10px" >
          <h1>${post.title}</h1>
          <hr style="margin:0px"/>
        </div>
           
        <div style="padding:10px 10px 0px 10px">
          <p>${maxContent}</p>
        </div>      
          <div class="d-flex flex-row-reverse">                    
            ${
              fullPost
                ? `<a id="back-btn" href="" class="btn btn-danger">Atras</a>`
                : `<div class="button-effect"><a href=""  class="effect effect-5" data-id=${post.id}  title="Leer Más">Leer más</a></div>`
            }
          </div>
      </div>   
    </article>
    `
  }

  renderPagination() {
    if (this.page === 1 && this.numPosts > this.maxEntriesPerPage) {
      return `
      <div class="button-effect"><a name="next" class="effect effect-4" data-pag=${
        this.page + 1
      }>Página ${this.page + 1}</a></div>
      `
    } else if (this.page > 1 && this.page < this.maxPages) {
      return `
        <div class="button-effect"><a name="prev" class="effect effect-3" data-pag=${
          this.page - 1
        }>Página ${this.page - 1}</a></div>
        <div class="button-effect"><a name="next" class="effect effect-4" data-pag=${
          this.page + 1
        }>Página ${this.page + 1}</a></div>
      `
    } else if (this.page === this.maxPages && this.page !== 1) {
      return `
      <div class="button-effect"><a name="prev" class="effect effect-3" data-pag=${
        this.page - 1
      }>Página ${this.page - 1}</a></div>
      `
    } else return ``
  }

  async renderPosts(fullPost = false) {
    return (
      await Promise.all(
        this.postsIDs.map(async postID => {
          const post = await this.#getPost(postID)
          return this.#generateMarkup(post, fullPost)
        })
      )
    ).join('')
  }
}

export default new Blogger(
  API_KEY,
  baseUrl,
  blogId,
  maxEntriesPerPage,
  maxContentLength
)
