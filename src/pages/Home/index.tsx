import { Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import BearProxy from './BearProxy';

const Home = () => {
	useEffect(() => { document.body.className = 'post'; }, []);

	return (
		<Fragment>
			<BearProxy />
			<h1>Markdown cheatsheet</h1>
			<p>
				<i>
					<time datetime="2020-06-01T00:00Z">31 May, 2020</time>
				</i>
			</p>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur tenetur beatae exercitationem suscipit et dolore, debitis magni? Nobis dolorum excepturi quo vero. Deserunt aliquam earum in rerum. Temporibus, ex veritatis?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nisi ratione omnis veritatis molestiae quod, magni aspernatur doloribus excepturi architecto quo illum sit neque voluptas, officiis voluptatum error, quas nam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt obcaecati iste facere laborum sint laudantium architecto vero, eveniet debitis temporibus a eos neque odio totam ad provident perspiciatis quos voluptatum!
			</p>
			<h2 id="emphasis">Emphasis</h2>
			<p>
				<strong>bold</strong> <em>italics</em> <del>strikethrough</del> <mark>mark</mark> <small>small</small>
			</p>
			<hr />
			<h2 id="headers">Headers</h2>
			<h1 id="big-header">Big header</h1>
			<h2 id="medium-header">Medium header</h2>
			<h3 id="small-header">Small header</h3>
			<h4 id="tiny-header">Tiny header</h4>
			<p>text</p>
			<hr />
			<h2 id="lists">Lists</h2>
			<ul>
				<li>Generic list item</li>
				<li>Generic list item</li>
				<li>Generic list item</li>
			</ul>
			<ol>
				<li>Numbered list item</li>
				<li>Numbered list item</li>
				<li>Numbered list item</li>
			</ol>
			<h2 id="links">Links</h2>
			<p><a href="http://www.example.com">http://www.example.com</a></p>
			<p><a href="http://www.example.com">Open in same tab</a></p>
			<p><a href="http://www.example.com" target="_blank">Open in new tab</a></p>
			<p><a href="#headers">Internal link</a></p>
			<hr />
			<h2 id="typographic-replacements">Typographic replacements</h2>
			<p>Bear Blog®© is a Good Blog™ that took ±3 years to perfect.</p>
			<p>I drink H<sub>2</sub>O at the 6<sup>th</sup> and 12<sup>th</sup> hours of the day.</p>
			<hr />
			<h2 id="linebreaks">Linebreaks</h2>
			<p>Adding a single line break will not be rendered as a line break.</p>
			<p>
				Here's some text.
				Here's some more text.
			</p>
			<p>To add a single line break use a <code>\</code> or two spaces at the end of the line.</p>
			<p>
				Here's some text.
				<br />
				Here's some more text.
			</p>
			<p>Adding 2 line breaks starts a new paragraph.</p>
			<p>Here is one paragraph with lengthly text.</p>
			<p>Here is another.</p>
			<hr />
			<h2 id="footnotes">Footnotes</h2>
			<p>Here's a simple footnote,<sup class="footnote-ref" id="fnref-1"><a href="#fn-1">1</a></sup> and here's a longer
				one.<sup class="footnote-ref" id="fnref-2"><a href="#fn-2">2</a></sup></p>
			<hr />
			<h2 id="quotes">Quotes</h2>
			<p>Text before quote:</p>
			<blockquote>
				<p>This is a quote.</p>
			</blockquote>
			<blockquote>
				<p>It can span multiple lines!</p>
				<p>Like this!</p>
			</blockquote>
			<blockquote class="centerpiece">
				<p>A central quote...</p>
			</blockquote>
			<p>Lines after quote...</p>
			<hr />
			<h2 id="images">Images</h2>
			<p>
				<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
			</p>
			<figcaption>Bear :)</figcaption>
			<ul class="gallery">
				<li>
					<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
					<figcaption>Bear 1</figcaption>
				</li>
				<li>
					<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
					<figcaption>Bear 2</figcaption>
				</li>
				<li>
					<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
					<figcaption>Bear 3</figcaption>
				</li>
				<li>
					<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
					<figcaption>Bear 4</figcaption>
				</li>
				<li>
					<img src="https://i.ibb.co/Vvh17pr/3jxqrKP.jpg" alt="Cheatsheet image example" />
					<figcaption>Bear 5</figcaption>
				</li>
			</ul>
			<p>Text after</p>
			<hr />
			<h2 id="tables">Tables</h2>
			<table>
				<thead>
					<tr>
						<th>Column 1</th>
						<th>Column 2</th>
						<th>Column 3</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John</td>
						<td>Doe</td>
						<td>Male</td>
					</tr>
					<tr>
						<td>Mary</td>
						<td>Smith</td>
						<td>Female</td>
					</tr>
				</tbody>
			</table>
			<hr />
			<h2 id="displaying-code">Displaying code</h2>
			<div class="highlight">
				<pre><span></span><span class="sb">`var example = "hello!";`</span>
				<br />
				<br />
				Or spanning multiple lines...
				<br />
				<br />
				<span class="sb">```javascript</span>
				<br />
				<span class="kd">var</span><span class="w"> </span><span class="nx">example</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"hello!"</span><span class="p">;</span>
				<br />
				<span class="nx">alert</span><span class="p">(</span><span class="nx">example</span><span class="p">);</span>
				<br />
				<span class="sb">```</span>
				</pre>
			</div>
			<p><code>var example = "hello!";</code></p>
			<div class="highlight">
				<pre><span></span><span class="kd">var</span><span class="w"> </span><span class="nx">example</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"hello!"</span><span class="p">;</span>
				<br />
			<span class="nx">alert</span><span class="p">(</span><span class="nx">example</span><span class="p">);</span>
			</pre>
			</div>
			<p><em>For language specific syntax highlighting, specify the language at the beginning of the code block.</em></p>
			<p><code>Lorem ipsum dolor</code>, sit amet consectetur adipisicing. <code>Code here, code there.</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit. <code>Code code</code></p>
			<h2 id="latex">LaTeX</h2><math display="block">
				<mrow>
					<mi>u</mi>
					<mo stretchy={false}>(</mo>
					<mi>n</mi>
					<mo stretchy={false}>)</mo>
					<mo>⇔</mo>
					<mfrac>
						<mrow>
							<mn>1</mn>
						</mrow>
						<mrow>
							<mrow>
								<mo stretchy={false}>(</mo>
								<mn>1</mn>
								<mo>−</mo>
								<msup>
									<mi>e</mi>
									<mrow>
										<mo>−</mo>
										<mi>j</mi>
										<mi>ω</mi>
									</mrow>
								</msup>
								<mo stretchy={false}>)</mo>
							</mrow>
						</mrow>
					</mfrac>
					<mo>+</mo>
					<munderover>
						<mo>∑</mo>
						<mrow>
							<mi>k</mi>
							<mo>=</mo>
							<mo>−</mo>
							<mo>∞</mo>
						</mrow>
						<mo>∞</mo>
					</munderover>
					<mrow>
						<mi>π</mi>
						<mi>δ</mi>
						<mo stretchy={false}>(</mo>
						<mi>ω</mi>
						<mo>+</mo>
						<mn>2</mn>
						<mi>π</mi>
						<mi>k</mi>
						<mo stretchy={false}>)</mo>
					</mrow>
				</mrow>
			</math>
			<p>For writing mathematical notation using LaTeX check out <a
					href="https://docs.bearblog.dev/mathematical-notation/">this guide</a>.</p>
			<hr />
			<h2>Text effects</h2>
			<p>
				This text is <span class="fx bouncy">bouncy like a trampoline</span>
			</p>
			<p>
				This text is <span class="fx sway">swaying to the wind</span>
			</p>
			<p>
				This text is <span class="fx wavy">wavy like the ocean</span>
			</p>
			<p>
				This text is <span class="fx shaky">shaky like i'm screaming!!!</span>
			</p>
			<p>
				This text is <span class="fx shaky together">speaking like i'm holding a grudge...</span>
			</p>
			<hr />
			<section class="footnotes">
				<ol>
					<li id="fn-1">
						<p>This is the first footnote.<a href="#fnref-1" class="footnote">↩</a></p>
					</li>
					<li id="fn-2">
						<p>Here's another one<a href="#fnref-2" class="footnote">↩</a></p>
					</li>
				</ol>
			</section>
		</Fragment>
	);
};

export default Home;
