---
math: yes
title: "Lecture 2"
categories: ["College Algebra (Susan Walter)", "Unit 1"]
tags: [lecture]
description:
---

## Functions

#### Example 1

Consider a function like

$$
f(x) = x^2-3x-10
$$

We have an input, $x$, and an expression, $x^2-3x-10$. So for whatever our input $x$ is, we just replace all occurrences of $x$ in the expression $x^2-3x-10$.

For example, if our input for $x$ is $2$ (in other words $f(2)$), we simply replace all $x$ in the entire equation with $2$:

$$
\begin{align*}
f({\color{red}x}) &= {\color{red}x}^2-3{\color{red}x}-10 \\
f({\color{red}2}) &= {\color{red}(2)}^2-3{\color{red}(2)}-10 \\
&= 4-6-10 \\
&= \boxed{-12}
.\end{align*}
$$

---

#### Example 2

Another example would be $f(a+h)$. Nothing changes; we just find & replace!

$$
\begin{align*}
f({\color{red}x}) &= {\color{red}x}^2-3{\color{red}x}-10 \\
f({\color{red}a+h}) &= {\color{red}(a+h)}^2-3{\color{red}(a+h)}-10
.\end{align*}
$$

---

#### Example 3

One more example that could cause confusion is the difference between $f(-a)$ and $-f(a)$. The "find and replace" rule here stays the same!

$$
f({\color{red}-a}) = ({\color{red}-a})^2-3({\color{red}-a})-10
$$

$-f(a)$ can be re--written as $-\left( f(a) \right)$. So if we know $f(a)$, which we do, we can just replace that!

$$
-\left( {\color{red}f(a)} \right) = - \left( {\color{red}a^2-3a-10} \right)
$$

Then we distribute the negative sign:

$$
\begin{align*}
{\color{red}-}\left( a^2-3a-10 \right) &= {\color{red}-}\left( a^2 \right) {\color{red}-} \left( -3a \right) {\color{red}-} \left( -10 \right) \\
&= \boxed{-a^2+3a+10}
.\end{align*}
$$

---

## Distribution & Factoring

#### Distribution

Let's revisit Example 2. We already found that

$$
\begin{align*}
f(a+h) &= (a+h)^2-3(a+h)-10 \\
&= \left( a+h \right)^2-3a-3h-10
.\end{align*}
$$

But, this isn't fully simplified. Let's look at $(a+h)^2$:

$$
(a+h)^2 = (a+h) \cdot (a+h)
$$

We can use FOIL (First Outer Inner Last) to distribute:

$$
\begin{align*}
({\color{red}a}+{\color{teal}h}) \cdot ({\color{lime}a}+{\color{orange}h}) &=
\underbrace{({\color{red}a} \cdot {\color{lime}a})}_{\text{first}} +
\underbrace{({\color{red}a} \cdot {\color{orange}h})}_{\text{outer}} +
\underbrace{({\color{teal}h} \cdot {\color{lime}a})}_{\text{inner}} +
\underbrace{({\color{teal}h} \cdot {\color{orange}h})}_{\text{last}} \\
&= a^2 + ah + ah + h^2 \\
&= a^2 + 2ah + h^2
.\end{align*}
$$

That's the hard part! Now, we can substitute that expansion for the $(a+h)^2$ in our original expression:

$$
\boxed{a^2+2ah+h^2-3a-3h-10}.
$$

---

#### Factoring

Factoring binomials is like "reverse FOILing," since we're trying to find the factors that multiply together to become our given equation.

Take the following binomial expression for example:

$$
x^2+6x+9
$$

Let's separate this binomial into its three components:

$$
{\color{red}x^2} {\color{orange}+6x} {\color{teal}+9}
$$

---

## Domain and Range

The domain of a function is all of the values of $x$ that it accepts as input. Conversely, a function's range is all of the values that it outputs.

![](/assets/img/walter/figures/ww1/fig1.svg){: .tikz }


