    window.userWalletAddress = null
    const loginButton = document.getElementById('loginButton')
    const userWallet = document.getElementById('userWallet')

    function toggleButton() {
      if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed'
        loginButton.classList.remove('bg-purple-500', 'text-white')
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
        return false
      }

      loginButton.addEventListener('click', loginWithMetaMask)
    }

    async function loginWithMetaMask() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
          console.error(e.message)
          return
        })
      if (!accounts) { return }

      window.userWalletAddress = accounts[0]
      userWallet.innerText = window.userWalletAddress
      loginButton.innerText = 'Sign out of MetaMask'

      loginButton.removeEventListener('click', loginWithMetaMask)
      setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask)
      }, 200)
    }

    function signOutOfMetaMask() {
      window.userWalletAddress = null
      userWallet.innerText = ''
      loginButton.innerText = 'Sign in with MetaMask'

      loginButton.removeEventListener('click', signOutOfMetaMask)
      setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask)
      }, 200)
    }

    window.addEventListener('DOMContentLoaded', () => {
      toggleButton()
    });