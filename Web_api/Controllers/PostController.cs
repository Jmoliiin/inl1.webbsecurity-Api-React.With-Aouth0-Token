using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Diagnostics;
using System.Web;
using Web_api.Data;
using Web_api.Models;
//using Webapi.Migrations;

namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        //private string[] _tagsAllowed = new string[] {"<p>","</p>","<br>", "<strong>", "</strong>", "<em>", "</em>", "<i>","</i>", "<b>","</b>","<h1>","</h1>", "<h2>", "</h2>","<h3>","</h3>","<h4>","</h4>", "<h5>","</h5>","å","Å","ä","Ä","Ö","ö" };
        private string[] _tagsAllowed = new string[] { "<p>", "</p>", "<br>", "<strong>", "</strong>", "<em>", "</em>", "å", "Å", "ä", "Ä", "Ö", "ö" };
        private readonly AppDbContext _Context;

        public PostController(AppDbContext context)
        {
            _Context = context;
        }

        //Get: api/Post
        [HttpGet]
       [EnableCors("react")] ///enable the policy so that only the policy "react can reach this api route"
        public async Task<IActionResult> GetPosts()
        {
            List<PostEntity> posts = await _Context.Posts.ToListAsync();

            foreach(var post in posts)
            {
                post.Author = EncodeString(post.Author, _tagsAllowed);
                post.Content = EncodeString(post.Content,_tagsAllowed);
                post.Title = EncodeString(post.Title, _tagsAllowed);
            }

            return new OkObjectResult(posts);

        }
        //Get: api/Post

        [HttpGet("{id}")]
        [EnableCors("react")]
        public async Task<IActionResult> Details(int id)
        {
            if (ModelState.IsValid)
            {
                var postDetail = await _Context.Posts.Where(x => x.Id == id).FirstOrDefaultAsync();
                
                if (postDetail != null)
                {
                    postDetail.Author = EncodeString(postDetail.Author, _tagsAllowed);
                    postDetail.Content = EncodeString(postDetail.Content, _tagsAllowed);
                    postDetail.Title = EncodeString(postDetail.Title,_tagsAllowed);

                    return new OkObjectResult(postDetail);
                }
            }

            return new NotFoundResult();

        }


        [HttpPost]
        [EnableCors("react")]
        [Authorize] //onley the audiens applications URL that is set and valid jwt can reach this route
        public async Task<IActionResult> CreatePosts(PostRequest post)
        {

            if (ModelState.IsValid)
            {
                //validera !!!!
                post.Arthure = EncodeString(post.Arthure, _tagsAllowed);
                post.Title = EncodeString(post.Title, _tagsAllowed);
                post.Content = EncodeString(post.Content, _tagsAllowed);
                
                try
                {
                    var postentity = new PostEntity
                    {
                        Author=post.Arthure,
                        Title = post.Title,
                        Content = post.Content,
                        CreatedDate = DateTime.Now,
                    };
                    _Context.Posts.Add(postentity);
                    await _Context.SaveChangesAsync();

                    //är en url till vart den har lagt sig CreatedResult
                    return new CreatedResult($"https://localhost:7170/api/Post/{postentity.Id}", postentity);
                }
                catch (Exception ex)
                {
                    //Skriv ut vad som blev fel
                    Debug.WriteLine(ex.Message);
                }

            }
            return new BadRequestResult();

        }
        public static string EncodeString(string encodeInput, string[] _tagsAllowed)
        {
            string encodedContent = HttpUtility.HtmlEncode(encodeInput);

            foreach (var tag in _tagsAllowed)
            {
                var encodedTag = HttpUtility.HtmlEncode(tag);
                encodedContent = encodedContent.Replace(encodedTag, tag);
            }
            encodeInput = encodedContent;
            return (encodeInput);
        }

    }
    
    
   
}
