$(function() {
  
    $('.prompt').html('root@3LIIX:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
});

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'whoami', 'education', 'security', 'programming', 'interests', 'love', 'media' ,'contact', 'blog', 'clear', 'help' 
  ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'more':
          var result = "<h2>more commands</h2><p><b>whoami</b>: display all personal informations.<br><b>education</b>: display all my information about my education.<br><b>proxcs</b>: display all my information about my achievements in programming and security.<br><b>interests</b>: display all my interests.<br><b>love</b>: are you curious about my love?<br><b>community</b>: join our community<br><b>contact</b>: Say hi<br><b>skills</b>: My sckills<br><b>clear</b>: clear terminal<br><b>more</b>: display this menu.<br><b>note</b>: note very important... ";
          output(result);
          break;
        case 'education':
          var result = "<h3>Education</h3>"+"<p>right now I'focus on my self studying, <br>and also I'm a techno electric student in the first year bacaloreant in the technic hight school IBN sina in kenitra, morocco ...";
          output(result);
          break;
        
        case 'proxcs':
          var result = "<h3>Programming</h3><p> I've been an enthusiast of programming my whole life. IMHO, programming is like a game of chess with a machine! I'm interested in web dev, mobile dev, and also desktop dev. I'm looking forward to learning more about being a full-stack developer!<p>"+"<h3> Security </h3> <p>after programming  I'm also interesst in the cyber security specific in the web security all that for creat a beautiful and secure environnement in the web $</p> <h3><br>More projects on my <a href=\"https://github.com/3LIIX\">Github</a></h3>";
          output(result);
          break;
        case 'interests': 
          var result = "<h3>Interests</h3><p>Algorithms, Data Structures, Problem Solving, Cyber Security , Web devloppement, learnning, AI, Computer science,Internet things, Operating systeme, networking, machine learnning and finnaly GIRLS !!! ..</p>";
          output(result);
          break;
        case 'skills':
          var result = "<h1>Frontend Developer</h1> <p>- HTML (Advance)</p><p>- CSS (Advanced)</p><p>- JavaScript (Intermediate)</p><p>- React (Intermediate)</p><p>- Git (Intermediate)</p><p>- Bootstrap (Intermediate)</p><h1>Back end Developer</h1> <p>- PHP</p><p>- Python</p><p>- Node js</p> <h1>Microsoft Office</h1> <p>- Word 2016 (Advance)</p><p>- PowerPoint 2016 (Advance)</p><p>- Excel 2016 (Intermediate)</p> <h1>CyberSecurity</h1> <p>- Networking (basic)</p><p>- Linux (Advance)</p><p>- Python data analyste (Advance)</p>";
          output(result);
          break;
        case 'contact':
          var result = "<h3>Contact</h3><h4>Email: alircham1@gmail.com<br>facebook: @3LIIX1<br>Instagram: ali.rcham</h4>";
          output(result);
          break;
        case 'whoami':
          var result = "<h1>Ali Rcham</h1><p>Web developper, computer science student, and Security Researcher</p><p>I am 16 years old. I am from morocco. I am a student at IBN SINA hight school in kenitra, Morocco, science techno electric (STE). I've been an enthusiast of programming my whole life. IMHO, programming is like a game of chess with a machine! I'm interested in web dev, mobile dev, and also desktop dev. I'm looking forward to learning more about being a full-stack developer! 😃 You can find me on GitHub and LinkedIn. I'm also a freelancer and a student of IBN SINA hight school. You will download my CV by clicking the button <a href=\"https://rcham.netlify.app/assets/pdf/3LIIX-CV.pdf/\">DOWNLOAD CV</a></h3></h1> </p> <h3>Interests</h3><p>Algorithms, Data Structures, Problem Solving, Cyber Security , Web devloppement, learnning, AI, Computer science,Internet things, Operating systeme, networking, machine learnning and finnaly GIRLS !!! ..</p>"
          output(result);
          break;
        case 'community':
          var result = "<h3>My Community</h3><h4><a href=\"https://www.facebook.com/groups/325188112860480\">Facebook Community</a> <br> <a href=\"https://www.facebook.com/gitcode\">Facebook page</a> <b><br><a href=\"https://t.me/+bfNkV1E1DyFlNjU0\">Telegram channel</a> <br> <a href=\"https://discord.gg/5XrsR7fy\">Discord server</a> </h4>";
          output(result);
          break;
        case 'love':
          output("<h3>404...<br>Just hard times for the moment. <br> M ❤️❤️❤️❤️❤️</h3>");
          break;
        case 'maryam':
          output("<h3>404...<br>love...</h3>");
          break;
        case 'oussama':
          output("<h3>good friend</h3>");
          break;
        case 'barae':
          output("<h3>good friend</h3>");
          break;
        case 'karim':
          output("<h3>good friend</h3>");
          break;
        case 'note':
            output("<h3>I'need a girl friend :(</h3>");
            break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<h1>Ali Rcham</h1><h3>Web developper, Writter, and Security Researcher<br>I regulary share my projects in my second portfolio : <a href=\"https://rcham.net/\">rcham.net</a></h3><p>Enter "more" for more information.</p><p> -- love <3</p>');
    },
    output: output
  }
};














































/*-- 3LIIX --*/
