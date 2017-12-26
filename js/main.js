// check window width
$(window).resize(function () {
    if ($(window).width() > 992) {
        $('.header-search').removeClass("slideSearch-top");
    }
});

$(document).ready(function () {
    /*OWL Caraousel Settings*/
    $(".items-slide").owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        loop: true
    });

    /* read more - toggle btn*/
    $(document).on('click', '.read-more-btn', function (e) {
        e.preventDefault();
        $(this).prev().toggleClass('show-text');
        if ($(this).prev().hasClass('show-text')) {
            $(this).text('Hide less');
        } else {
            $(this).text('Read more');
        }
    });

    /* Edit menu post*/
    $(document).on('click', '.edit-menu-btn', function (e) {
        e.preventDefault();
        $(this).next().slideToggle();
    })

    /* Likes */
    function likes(e) {
        e.preventDefault();
        $target = $(this);
        $span = $target.siblings();
        $currentLikeValue = $span.text();

        if (!$span.hasClass('liked')) {
            $span.addClass('liked');
            $newValue = parseInt($currentLikeValue) + 1;
            $($target).css('color', '#0093ff');
            $($target).css('font-weight', 'bold');
        } else {
            $span.removeClass('liked');
            $newValue = parseInt($currentLikeValue) - 1;
            $($target).css('color', '#8d8d8d');
            $($target).css('font-weight', 'normal');
        }

        $currentLikeValue = $newValue;
        // console.log($currentLikeValue);
        $span.text($currentLikeValue);
    }

    /*main menu */
    $('.open-menu, .profile').on('click', function () {
        $('.profile-menu').slideToggle();
    });

    /* search input*/
    $('.search-nav-btn').on('click', function () {
        if ($(window).width() < 992) {
            $('.header-search').toggleClass('slideSearch-top');
        }
    });

    /* share links */
    function expandShareLinks(e) {
        e.preventDefault();
        $target = $(this);
        $expandDiv = $target.prev().toggle("slow");
        //console.log($expandDiv);
    }

    // Add comment
    function addCommentDOM(e) {
        e.preventDefault();
        $target = $(this);
        $input = $target.parents('.add-comment-post').children().find('.form-control');
        $inputValue = $input.val();
        //console.log($inputValue);

        if ($inputValue != 0) {
            if ($inputValue.length > 170) {
                //console.log($inputValue.length);
                $commentDomWithReadMoreBtn = $(`<div class='comment'>
                <div class='post-header comment-header'>
                    <div class='user-img'>
                        <img src='images/user-post-3.png' alt=''>
                    </div>
                    <div class='user'>
                        <h1>Chrissy Davids Smith</h1>
                        <span>add a comment</span>
                    </div>
                </div>
                <div class="content">
                <h2>Tempor incididunt ut labore et dolore magna</h2>
                <div class="text-content">
                    <p>`+ $inputValue + `</p>
                </div>
                <a class="read-more-btn" href="#">Read more</a>
            </div>

            </div>
            <div class='clearfix'></div>'`);
                $commentSection = $target.parents('.main-post').children('.post-content');
                $commentSection.append($commentDomWithReadMoreBtn);
            }
            else {
                $commentDom = $(`<div class='comment'>
                <div class='post-header comment-header'>
                    <div class='user-img'>
                        <img src='images/user-post-3.png' alt=''>
                    </div>
                    <div class='user'>
                        <h1>Chrissy Davids Smith</h1>
                        <span>add a comment</span>
                    </div>
                </div>
                <div class='content'>
                    <h2>Tempor incididunt ut labore et dolore magna</h2>
                <p>`+ $inputValue + `</p>
                </div>
            </div>
            <div class='clearfix'></div>'`);
                $commentSection = $target.parents('.main-post').children('.post-content');
                $commentSection.append($commentDom);
            }
            //console.log($commentSection);
            $input.val('');
        }
    }

    /*remove post*/
    function deletePost(e) {
        e.preventDefault();
        $target = $(this);
        $input = $target.closest('.main-post');
        $userConfirm = confirm("Are you sure you want to delete post?");
        // console.log($userConfirm);
        if ($userConfirm == true) {
            $input.remove();
        }
        //console.log($input);
    }

    /* add new post function */
    function addNewPost(e) {
        e.preventDefault();
        $titlePost = $('.new-post-title');
        $titlePostValue = $titlePost.val();
        $contentPost = $('.comment-text');
        $contentPostValue = $contentPost.val();
        $formContainer = $('.add-post-container');
        $test = $('.add-post');

        if ($contentPostValue.length > 163) {
            $dom = newPostDomWithShowMoreBtn($titlePostValue, $contentPostValue);
            
        } else {
            $dom = newPostDom($titlePostValue, $contentPostValue);
        }

        if ($titlePostValue != 0 && $contentPostValue != 0) {
            $test.before($dom);
            $addpostconrainer = $('.add-post-container').css('display', 'none');

            $titlePost.val('');
            $contentPost.val('');
        }
    }


    /* close add new post form*/
    $('.fa-times').on('click', function () {
        $titlePost = $('.new-post-title');
        $contentPost = $('.comment-text');
        $titlePost.val('');
        $contentPost.val('');
        $('.add-post-container').css('display', 'none');
    });

    /* open add new post form*/
    $('.fa-plus').on('click', function () {
        $('.add-post-container').css('display', 'block');
    });


    // trigger likes function
    $(document).on('click', '.addLike', likes);
    // trigger expandShareLinks function
    $(document).on('click', 'i[class~="fa-share-alt"]', expandShareLinks);
    // trigger addCommentDOM function
    $(document).on('click', '.button-send', addCommentDOM);
    // trigger deletePost function
    $(document).on('click', '.delete', deletePost);
    /*trigger addNewPost function */
    $(document).on('click', '.submitNewPost', addNewPost);

});// document.ready END


/* dom for a new post without read-more-btn if text length > 163 */
function newPostDomWithShowMoreBtn(title, postContent) {
    var dom = `<div class="main-post">
    <div class="post-header">
        <div class="user-img">
            <img src="images/user-post-1.png" alt="">
        </div>
        <div class="user">
            <h1>Mark Klein</h1>
            <span>uploaded a video</span>
        </div>
        <div class="time">10 mins ago
            <a href="#" class="edit-menu-btn">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <ul class="slide-menu">
                <li>
                    <a href="#">Edit</a>
                </li>
                <li>
                    <a href="#" class="delete">Delete</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="post-content">
        <div class="content">
            <h2>`+ title + `</h2>
            <div class="text-content">
                <p>`+ postContent + `</p>
            </div>
            <a class="read-more-btn" href="#">Read more</a>
        </div>
    </div>
    <div class="share-section">
        <ul>
            <li>
                <span class="like-count">14</span>
                <i class="fa fa-thumbs-o-up addLike" aria-hidden="true"></i>
            </li>
            <li>
                <span class="comment-count">7</span>
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </li>
            <li>
                <div class="share-links">
                    <ul>
                        <li>
                            <a href="#">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-pinterest" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
            </li>
        </ul>
    </div>
    <div class="add-comment-post">
        <div class="row">
            <div class="col-md-12">
                <form>
                    <img src="images/profil1.png" alt="profile" class="comment-img">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="&#xf040; Add comment">
                        <span class="input-group-btn">
                            <button class="btn button-video" type="button">
                                <i class="fa fa-video-camera" aria-hidden="true"></i>
                            </button>
                            <button class="btn button-send" type="button">Send</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`;

    return dom;
}
/* dom for a new post without read-more-btn if text length  !> 163 */
function newPostDom(title, postContent) {
    var dom = `<div class="main-post">
    <div class="post-header">
        <div class="user-img">
            <img src="images/user-post-1.png" alt="">
        </div>
        <div class="user">
            <h1>Mark Klein</h1>
            <span>uploaded a video</span>
        </div>
        <div class="time">10 mins ago
            <a href="#" class="edit-menu-btn">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <ul class="slide-menu">
                <li>
                    <a href="#">Edit</a>
                </li>
                <li>
                    <a href="#" class="delete">Delete</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="post-content">
        <div class="content">
            <h2>`+ title + `</h2>
            <div class="text-content">
                <p>`+ postContent + `</p>
            </div>
        </div>
    </div>
    <div class="share-section">
        <ul>
            <li>
                <span class="like-count">14</span>
                <i class="fa fa-thumbs-o-up addLike" aria-hidden="true"></i>
            </li>
            <li>
                <span class="comment-count">7</span>
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </li>
            <li>
                <div class="share-links">
                    <ul>
                        <li>
                            <a href="#">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-pinterest" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
            </li>
        </ul>
    </div>
    <div class="add-comment-post">
        <div class="row">
            <div class="col-md-12">
                <form>
                    <img src="images/profil1.png" alt="profile" class="comment-img">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="&#xf040; Add comment">
                        <span class="input-group-btn">
                            <button class="btn button-video" type="button">
                                <i class="fa fa-video-camera" aria-hidden="true"></i>
                            </button>
                            <button class="btn button-send" type="button">Send</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`;

    return dom;
}
